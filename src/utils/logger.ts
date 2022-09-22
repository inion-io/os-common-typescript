const CONFIG = {
  SYSTEM: {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underscore: "\x1b[4m",
    reverse: "\x1b[7m",
    strikethrough: "\x1b[9m",
    backoneline: "\x1b[1A",
    cleanthisline: "\x1b[K"
  },
  FONT: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
  BACKGROUND: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m"
  }
};

// Sequence of levels is important.
const LEVELS = ["trace", "debug", "info", "warn", "error", "disable"];

export default class Logger {
  private ErrorStackParser = require("error-stack-parser");
  private command: string;
  private discoveryName: string = "";
  private lastCommand: string;
  private level?: string;
  private noColor: boolean;

  constructor() {
    // Current command
    this.command = '';
    // Last line
    this.lastCommand = '';

    // set level from env
    const level = process.env.LOGGER;
    if (this.isLevelValid(level as string)) {
      this.level = level;
    }

    this.noColor = false;
  }

  bgColor(ticket: string) {
    if (Reflect.has(CONFIG.BACKGROUND, ticket)) {
      this.command += Reflect.get(CONFIG.BACKGROUND, ticket);
    } else {
      this.warn(["node-color-log: Background color not found! Use the default."])
    }
    return this;
  }

  bgColorLog(ticket: string, text: string, setting: []) {
    let command = '';
    if (setting) {
      command += this.checkSetting(setting);
    }
    if (Reflect.has(CONFIG.BACKGROUND, ticket)) {
      command += Reflect.get(CONFIG.BACKGROUND, ticket);
    } else {
      this.warn(["node-color-log: Background color not found! Use the default."])
    }
    command += text;

    command += CONFIG.SYSTEM.reset;
    console.log(command);
  }

  bold() {
    this.command += CONFIG.SYSTEM.bold;
    return this;
  }

  checkSetting(setting: []) {
    const validSetting = ['bold', 'italic', 'dim', 'underscore', 'reverse', 'strikethrough'];
    let command = '';
    for (const item in setting) {
      if (validSetting.indexOf(item) !== -1) {
        if (setting[item] === true) {
          command += Reflect.get(CONFIG.SYSTEM, item);
        } else if (setting[item] !== false) {
          this.warn([`node-color-log: The value ${item} should be boolean.`])
        }
      } else {
        this.warn([`node-color-log: ${item} is not valid in setting.`])
      }
    }
    return command;
  }

  color(ticket: string) {
    if (Reflect.has(CONFIG.FONT, ticket)) {
      this.command += Reflect.get(CONFIG.FONT, ticket);
    } else {
      this.warn(["node-color-log: Font color not found! Use the default."])
    }
    return this;
  }

  colorLog(ticketObj: object, text: string, setting: []) {
    let command = '';
    let font = Reflect.get(ticketObj, "font");
    let bg = Reflect.get(ticketObj, "bg");

    if (setting) {
      command += this.checkSetting(setting);
    }
    if (Reflect.has(CONFIG.FONT, font)) {
      command += Reflect.get(CONFIG.FONT, font);
    } else {
      this.warn(["node-color-log: Font color not found! Use the default."])
    }
    if (Reflect.has(CONFIG.BACKGROUND, bg)) {
      command += Reflect.get(CONFIG.BACKGROUND, bg);
    } else {
      this.warn(["node-color-log: Background color not found! Use the default."])
    }

    command += text;

    command += CONFIG.SYSTEM.reset;
    console.log(command);
  }

  debug(...args: any) {
    if (!this.isAllowedLevel("debug"))
      return;

    if (this.noColor) {
      const d = this.getDate();
      this.log(d, " [DEBUG] ", ...args);
    } else {
      const d = this.getDate();
      const i = this._getCellInfos();
      this.log(d + " ").joint()
      .bgColor('cyan').color('black').log("[DEBUG]").joint()
      .log(" ").joint()
      .log(i).joint()
      .log(" : ").joint()
      .color("cyan").log(this.discoveryName).joint()
      .color("cyan").log(...args);
    }
  }

  dim() {
    this.command += CONFIG.SYSTEM.dim;
    return this;
  }

  error(...args: any) {
    if (!this.isAllowedLevel("error"))
      return;

    if (this.noColor) {
      const d = this.getDate();
      this.log(d, " [ERROR] ", ...args);
    } else {
      const d = this.getDate();
      const i = this._getCellInfos();
      this.log(d + " ").joint()
      .bgColor('red').log('[ERROR]').joint()
      .log(" ").joint()
      .log(i).joint()
      .log(" : ").joint()
      .color("red").log(this.discoveryName).joint()
      .color("red").log(...args).joint()
      .log(new Error().stack);
    }
  }

  fontColorLog(ticket: string, text: string, setting: []) {
    let command = '';
    if (setting) {
      command += this.checkSetting(setting);
    }
    if (Reflect.has(CONFIG.FONT, ticket)) {
      command += Reflect.get(CONFIG.FONT, ticket);
    } else {
      this.warn(["node-color-log: Font color not found! Use the default."])
    }
    command += text;

    command += CONFIG.SYSTEM.reset;
    console.log(command);
  }

  getDate() {
    return this._getDate();
  }

  info(...args: any) {
    if (!this.isAllowedLevel("info"))
      return;

    if (this.noColor) {
      const d = this.getDate();
      this.log(d, " [INFO] ", ...args);
    } else {
      const d = this.getDate();
      const i = this._getCellInfos();
      this.log(d + " ").joint()
      .bgColor('green').color('black').log('[INFO]').joint()
      .log(" ").joint()
      .log(i).joint()
      .log(" : ").joint()
      .color("green").log(this.discoveryName).joint()
      .color("green").log(...args);
    }
  }

  isAllowedLevel(level: string) {
    return this.level ? LEVELS.indexOf(this.level) <= LEVELS.indexOf(level) : true
  }

  isLevelValid(level: string) {
    return LEVELS.includes(level);
  }

  italic() {
    this.command += CONFIG.SYSTEM.italic;
    return this;
  }

  joint() {
    // Clear the last line
    console.log(CONFIG.SYSTEM.backoneline + CONFIG.SYSTEM.cleanthisline);

    // Reset the command to let it joint the next
    // And print from the position of last line
    this.command = '';

    // if joint more than twice, we should clean the previous
    // backline command, since we should only do it for the
    // current time.
    this.lastCommand = this.lastCommand.replace(CONFIG.SYSTEM.backoneline, "");

    // back to the last line
    this.command += CONFIG.SYSTEM.backoneline;

    this.command += this.lastCommand;
    return this;
  }

  reverse() {
    this.command += CONFIG.SYSTEM.reverse;
    return this;
  }

  setDate(callback: any) {
    this._getDate = callback;
  }

  setDiscoveryName(discoveryName: string): void {
    this.discoveryName = "| " + discoveryName + " | ";
  }

  setLevel(level: string) {
    if (this.isLevelValid(level)) {
      this.level = level;
    } else {
      throw "Level you are trying to set is invalid";
    }

  }

  setLevelColor() {
    this.noColor = false;
  }

  setLevelNoColor() {
    this.noColor = true;
  }

  strikethrough() {
    this.command += CONFIG.SYSTEM.strikethrough;
    return this;
  }

  trace(...args: any) {
    if (!this.isAllowedLevel("trace"))
      return;

    if (this.noColor) {
      const d = this.getDate();
      this.log(d, " [DEBUG] ", ...args);
    } else {
      const d = this.getDate();
      const i = this._getCellInfos();
      this.log(d + " ").joint()
      .bgColor('magenta').color('black').log("[TRACE]").joint()
      .log(" ").joint()
      .log(i).joint()
      .log(" : ").joint()
      .color("magenta").log(this.discoveryName).joint()
      .color("magenta").log(...args);
    }
  }

  underscore() {
    this.command += CONFIG.SYSTEM.underscore;
    return this;
  }

  warn(...args: any) {
    if (!this.isAllowedLevel("warn"))
      return;


    const d = this.getDate();
    const i = this._getCellInfos();
    this.log(d + " ").joint()
    .bgColor('yellow').color('black').log('[WARN]').joint()
    .log(" ").joint()
    .log(i).joint()
    .log(" : ").joint()
    .color("yellow").log(this.discoveryName).joint()
    .color("yellow").log(args);

  }

  private _getCellInfos(): string {
    let elements = this.ErrorStackParser.parse(new Error());
    let element = elements[3];
    let lineNumber = Reflect.get(element, "lineNumber");

    let functionName = Reflect.get(element, "functionName");
    if (functionName !== undefined) {
      functionName = functionName.substring(functionName.lastIndexOf(".") + 1);
    } else {
      functionName = "";
    }

    let fileName = Reflect.get(element, "fileName");
    if (fileName !== undefined) {
      fileName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.lastIndexOf("."));
    } else {
      fileName = "";
    }

    return "[" + fileName + ":" + functionName + ":" + lineNumber + "]";
  }

  private _getDate = () => (new Date()).toISOString();

  private log(...args: any) {
    for (let idx = 0; idx < args.length; idx++) {
      const arg = args[idx];
      if (typeof arg === "string") {
        this.command += arg;
      } else {
        this.command += JSON.stringify(arg, (key, value) => {
          if (key === "rootCell") {
            return;
          }
          return value;
        });
      }
      if (args.length > 1 && idx < args.length - 1) {
        this.command += " ";
      }
    }

    if (!this.noColor) {
      this.command += CONFIG.SYSTEM.reset;
    }
    console.log(this.command);
    // Save last command if we need to use for joint
    this.lastCommand = this.command;
    this.command = '';
    return this;
  }

}
