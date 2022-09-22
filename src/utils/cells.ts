import {v4 as uuidv4} from 'uuid';

namespace Cells {
  export const IDENTIFIER_CELL_NAME = "identifier-cell-name";
  export const IDENTIFIER_CELL_TYPE = "identifier-cell-type";
  export const IDENTIFIER_CELL_UUID = "identifier-cell-uuid";
  export const IDENTIFIER_CELL_URI = "identifier-cell-uri";

  export class UUID {
    constructor(value: string) {
      this._value = value;
    }

    private _value: string;

    get value(): string {
      return this._value;
    }

    static random() {
      return uuidv4();
    }
  }

  export class URI {
    private _helper = require("uri-js");
    private _value: object;

    constructor(value: string) {
      this._value = this._helper.parse(value);
    }

    get fragment(): string {
      return Reflect.get(this._value, "fragment");
    }

    get host(): string {
      return Reflect.get(this._value, "host");
    }

    get path(): string {
      return Reflect.get(this._value, "path");
    }

    get port(): string {
      return Reflect.get(this._value, "port");
    }

    get query(): string {
      return Reflect.get(this._value, "query");
    }

    get scheme(): string {
      return Reflect.get(this._value, "scheme");
    }

    get userinfo(): string {
      return Reflect.get(this._value, "userinfo");
    }

    static parse(value: string) {
      return new URI(value);
    }

    cutFirstPath() {
      let uri = this.scheme + "://" + this.host + ":" + this.port;

      if (this.path.length > 0 && this.path.substring(1).split("/").length > 1) {
        let path = this.path.substring(1).split("/");
        for (let a = 0; a < path.length; a++) {
          if (a > 0) {
            uri += "/" + path[a];
          }
        }
      }

      this._value = this._helper.parse(uri);
    }

    firstPath(): string {
      let uri = ""

      if (this.path.length > 0) {
        uri += this.path.substring(1).split("/")[0];
      }

      return uri;
    }

    toString(): string {
      return this.scheme + "://" + this.host + ":" + this.port + this.path;
    }
  }

  export class Identifier {
    key: string;
    value: string;

    constructor(key: string, value: string) {
      this.key = key
      this.value = value;
    }

    static cellName(cellName: string): Cells.Identifier {
      return new Cells.Identifier(Cells.IDENTIFIER_CELL_NAME, cellName);
    }

    static type(type: string): Cells.Identifier {
      return new Cells.Identifier(Cells.IDENTIFIER_CELL_TYPE, type);
    }

    static uri(uri: string): Cells.Identifier {
      return new Cells.Identifier(Cells.IDENTIFIER_CELL_URI, uri);
    }

    static uuid(uuid: string): Cells.Identifier {
      return new Cells.Identifier(Cells.IDENTIFIER_CELL_UUID, uuid);
    }

    getValue(): string {
      return this.value;
    }

    isCellName() {
      return this.key === IDENTIFIER_CELL_NAME;
    }

    isType() {
      return this.key === IDENTIFIER_CELL_TYPE;
    }

    isURI() {
      return this.key === IDENTIFIER_CELL_URI;
    }

    isUUID() {
      return this.key === IDENTIFIER_CELL_UUID;
    }
  }
  export class Helper {
    static isCell(obj: any): boolean {
      let hasCellType = Reflect.has(obj as object, "cellType");
      let hasCellUUID = Reflect.has(obj as object, "cellUUID");

      return hasCellType || hasCellUUID;
    }
  }
}

export default Cells;
