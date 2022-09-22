import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";
import Logger from "../utils/logger";
import Action from "../messaging/decorators/action";
import {SiDiscoveryInitialized} from "../discovery/messages/siDiscoveryInitialized";

namespace SiLogger {
  export const CELL_TYPE = "logger";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiLogger extends SiCell<SiLogger, Logger> {
  debug(...args: any): void;

  error(...args: any): void;

  info(...args: any): void;

  trace(...args: any): void;

  warn(...args: any): void;
}

@CellType(
  SiLogger.CELL_TYPE,
  SiLogger.CELL_UUID
)
class SiLoggerClass extends SiCellClass<SiLogger, Logger> implements SiLogger {

  afterCreate() {
    this.setCellValue(new Logger());
    this.getCellValue()?.setLevel("debug");
    super.afterCreate();
  }

  @Action(SiDiscoveryInitialized.EVENT_NAME)
  afterDiscoveryInitialized() {
    this.getCellValue()?.setDiscoveryName(this.root().getDiscoveryName().getCellValue()!);
  }

  debug(...args: any): void {
    if (this.root().getDiscoveryName() !== undefined) {
      this.getCellValue()?.setDiscoveryName(this.root().getDiscoveryName().getCellValue()!);
    }
    this.getCellValue()!.debug(...args);
  }

  error(...args: any): void {
    if (this.root().getDiscoveryName() !== undefined) {
      this.getCellValue()?.setDiscoveryName(this.root().getDiscoveryName().getCellValue()!);
    }
    this.getCellValue()!.error(...args);
  }

  info(...args: any): void {
    if (this.root().getDiscoveryName() !== undefined) {
      this.getCellValue()?.setDiscoveryName(this.root().getDiscoveryName().getCellValue()!);
    }
    this.getCellValue()!.info(...args);
  }

  trace(...args: any): void {
    if (this.root().getDiscoveryName() !== undefined) {
      this.getCellValue()?.setDiscoveryName(this.root().getDiscoveryName().getCellValue()!);
    }
    this.getCellValue()!.trace(...args);
  }

  warn(...args: any): void {
    if (this.root().getDiscoveryName() !== undefined) {
      this.getCellValue()?.setDiscoveryName(this.root().getDiscoveryName().getCellValue()!);
    }
    this.getCellValue()!.warn(...args);
  }
}

export {SiLogger};
export default SiLoggerClass;

