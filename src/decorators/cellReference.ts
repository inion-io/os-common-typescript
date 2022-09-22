import SiCellClass, {SiCell} from "../siCell";
import Cells from "../utils/cells";

function CellReference(cellClass: new () => SiCell<any, any>): Function ;
function CellReference(cellIdentifier: Cells.Identifier): Function;
function CellReference(cellIdentifier: any): Function {
  return function (target: Object, propertyKey: string) {

    let cellType, cellUUID, cellClass;

    if (typeof cellIdentifier === "function") {
      cellClass = cellIdentifier;
    } else if (cellIdentifier instanceof Cells.Identifier) {
      if (cellIdentifier.isType()) {
        cellType = cellIdentifier.getValue();
      }
      if (cellIdentifier.isUUID()) {
        cellUUID = cellIdentifier.getValue();
      }
    }

    if (cellType === undefined && cellUUID === undefined && cellClass === undefined) {
      throw Error("cell class has no definition for cellType and cellUUID or cellClass: " + cellIdentifier);
    }

    Reflect.defineMetadata(CellReference.META_CELL_TYPE, cellType, target, propertyKey);
    Reflect.defineMetadata(CellReference.META_CELL_UUID, cellUUID, target, propertyKey);
    Reflect.defineMetadata(CellReference.META_CELL_CLASS, cellClass, target, propertyKey);

    let keys: string[] = [];

    if (Reflect.hasOwnMetadata(CellReference.META_PROPERTY_KEYS, target)) {
      keys = Reflect.getMetadata(CellReference.META_PROPERTY_KEYS, target);
    }

    keys.push(propertyKey);

    Reflect.defineMetadata(CellReference.META_PROPERTY_KEYS, keys, target);

  }
}

namespace CellReference {
  export const META_PROPERTY_KEYS = "eventDecoratorCellReferencePropertyKeys";
  export const META_CELL_NAME = "cellName";
  export const META_CELL_TYPE = "cellType";
  export const META_CELL_UUID = "cellUUID";
  export const META_CELL_CLASS = "cellClass";
  export const META_SCOPE = "scope";

  export class Option {
    key: string;
    value: string | number | boolean;

    constructor(key: string, value: string | number | boolean) {
      this.key = key;
      this.value = value;
    }

    static scope(value: string): Option {
      return new Option(META_SCOPE, value);
    }

    getKey(): string {
      return this.key;
    }

    getValue(): string | number | boolean {
      return this.value;
    }
  }

  export class Property {
    private readonly _cellClass: new () => SiCellClass<any, any>;
    private readonly _cellName: string;
    private readonly _cellType: string;
    private readonly _cellUUID: string;
    private readonly _propertyKey: string;

    constructor(cellName: string, cellType: string, cellUUID: string, cellClass: new () => SiCellClass<any, any>,
                propertyKey: string) {
      this._cellName = cellName;
      this._cellType = cellType;
      this._cellUUID = cellUUID;
      this._cellClass = cellClass;
      this._propertyKey = propertyKey;
    }

    get cellClass(): new () => SiCellClass<any, any> {
      return this._cellClass;
    }

    get cellName(): string {
      return this._cellName;
    }

    get cellType(): string {
      return this._cellType;
    }

    get cellUUID(): string {
      return this._cellUUID;
    }

    get propertyKey(): string {
      return this._propertyKey;
    }
  }

  export class Helper {
    static getProperties(cell: SiCell<any, any>): Property[] {
      let list: Property[] = [];
      let properties: string[] = Reflect.getMetadata(META_PROPERTY_KEYS, cell);

      if (properties !== undefined) {
        properties.forEach((propertyKey) => {
          let cellType: string = Reflect.getMetadata(META_CELL_TYPE, cell, propertyKey);
          let cellUUID: string = Reflect.getMetadata(META_CELL_UUID, cell, propertyKey);
          let cellName: string = Reflect.getMetadata(META_CELL_NAME, cell, propertyKey);
          let cellClass: new () => SiCellClass<any, any> = Reflect.getMetadata(META_CELL_CLASS, cell, propertyKey);

          list.push(new Property(cellName, cellType, cellUUID, cellClass, propertyKey));
        })
      }

      return list;
    }

    static hasProperties(cell: SiCell<any, any>): boolean {
      let properties: string[] = Reflect.getMetadata(META_PROPERTY_KEYS, cell);
      return properties !== undefined && properties.length > 0;
    }

    static hasProperty(cell: SiCell<any, any>, key: string): boolean {
      let properties: string[] = Reflect.getMetadata(META_PROPERTY_KEYS, cell);
      return properties !== undefined && properties.length > 0 && properties.indexOf(key) > -1;
    }
  }
}

export default CellReference;




