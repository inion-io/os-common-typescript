import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";

namespace SiObject {
  export const CELL_TYPE = "object";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiObject extends SiCell<SiObject, object> {
  addProperty(propertyKey: string, value: any): void;

  getProperty(propertyKey: string): any;

  getString(propertyKey: string): string;

  getArray(propertyKey: string): [] | undefined;

  getObject(propertyKey: string): object | undefined;

  hasProperty(propertyKey: string): boolean;

  isArray(propertyKey: string): boolean;

  isFunction(propertyKey: string): boolean;

  isObject(propertyKey: string): boolean;

  isPrimitive(propertyKey: string): boolean;

  isSymbol(propertyKey: string): boolean;
}

@CellType(
  SiObject.CELL_TYPE,
  SiObject.CELL_UUID
)
class SiObjectClass extends SiCellClass<SiObject, object> implements SiObject {
  addProperty(propertyKey: string, value: any): void {
    if (!this.hasCellValue()) {
      this.cellValue = {};
    }

    Reflect.set(this.getCellValue()!, propertyKey, value);
  }

  getProperty(propertyKey: string): any {
    if (!this.hasCellValue()) {
      return undefined;
    }

    return Reflect.get(this.getCellValue()!, propertyKey);
  }

  hasProperty(propertyKey: string): boolean {
    if (!this.hasCellValue()) {
      return false;
    }

    let hasProperty = this.getCellValue()?.hasOwnProperty(propertyKey);

    return hasProperty || false;
  }

  isArray(propertyKey: string): boolean {
    return Array.isArray(this.getProperty(propertyKey));
  }

  isFunction(propertyKey: string): boolean {
    return typeof this.getProperty(propertyKey) === "function";
  }

  isObject(propertyKey: string): boolean {
    return typeof this.getProperty(propertyKey) === "object";
  }

  isPrimitive(propertyKey: string): boolean {
    return !this.isArray(propertyKey) && !this.isObject(propertyKey) && !this.isFunction(propertyKey)
      && !this.isSymbol(propertyKey);
  }

  isSymbol(propertyKey: string): boolean {
    return typeof this.getProperty(propertyKey) === "symbol";
  }

  setCellValueAsObject(value: Object): SiObject {
    if (typeof value === "string") {
      this.setCellValueAsString(value);
    } else if (typeof value === "object") {
      this.cellValue = value as object;
    }

    return this.getSelf();
  }

  setCellValueAsString(value: string): SiObject {
    try {
      let obj = JSON.parse(value);

      if (typeof obj === "object") {
        this.cellValue = JSON.parse(value);
      }
    } catch (error) {
      this.cellValue = undefined;
    }

    return this.getSelf();
  }

  getArray(propertyKey: string): [] | undefined {
    if (this.isArray(propertyKey)) {
      return this.getProperty(propertyKey) as [];
    }
    return undefined;
  }

  getObject(propertyKey: string): object | undefined {
    if (this.isObject(propertyKey)) {
      return this.getProperty(propertyKey) as object;
    }
    return undefined;
  }

  getString(propertyKey: string): string {
    if (this.isPrimitive(propertyKey)) {
      return this.getProperty(propertyKey) as string;
    }
    return "";
  }
}



export {SiObject};
export default SiObjectClass;
