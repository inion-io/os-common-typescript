import SiCellClass, {SiCell} from "../siCell";
import Cells from "../utils/cells";

function Cell(cellClass: new () => SiCell<any, any>, ...options: Cell.Option[]): Function ;
function Cell(cellIdentifier: Cells.Identifier, ...options: Cell.Option[]): Function;
function Cell(cellIdentifier: any, ...options: Cell.Option[]): Function {
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

    Reflect.defineMetadata(Cell.META_CELL_TYPE, cellType, target, propertyKey);
    Reflect.defineMetadata(Cell.META_CELL_UUID, cellUUID, target, propertyKey);
    Reflect.defineMetadata(Cell.META_CELL_CLASS, cellClass, target, propertyKey);

    options.forEach((option) => {
      Reflect.defineMetadata(option.getKey(), option.getValue(), target, propertyKey);
    });

    let cellProperties: string[] = Cell.Helper.processProperties(target);

    cellProperties.push(propertyKey);

    Reflect.defineMetadata(Cell.META_PROPERTY_KEYS, cellProperties, target);
  }
}

namespace Cell {
  export const META_PROPERTY_KEYS = "eventDecoratorCellPropertyKeys";
  export const META_CELL_NAME = "cellName";
  export const META_CELL_TYPE = "cellType";
  export const META_CELL_UUID = "cellUUID";
  export const META_CELL_CLASS = "cellClass";
  export const META_ORDER = "order";
  export const META_TRANSIENT = "transient";
  export const META_VALUE = "value";
  export const META_SCOPE = "scope";

  export class Option {
    key: string;
    value: string | number | boolean;

    constructor(key: string, value: string | number | boolean) {
      this.key = key;
      this.value = value;
    }

    static cellName(name: string): Option {
      return new Option(META_CELL_NAME, name);
    }

    static order(order: number): Option {
      return new Option(META_ORDER, order);
    }

    static scope(value: string): Option {
      return new Option(META_SCOPE, value);
    }

    static transient(transient: boolean): Option {
      return new Option(META_TRANSIENT, transient);
    }

    static value(value: string): Option {
      return new Option(META_VALUE, value);
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
    private readonly _order: number;
    private readonly _propertyKey: string;
    private readonly _scope: string;
    private readonly _transient: boolean;
    private readonly _value: string;

    constructor(cellName: string, cellType: string, cellUUID: string, cellClass: new () => SiCellClass<any, any>,
                transient: boolean, order: number, value: string, scope: string, propertyKey: string) {
      this._cellName = cellName;
      this._cellType = cellType;
      this._cellUUID = cellUUID;
      this._cellClass = cellClass;
      this._transient = transient;
      this._order = order;
      this._value = value;
      this._scope = scope;
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

    get order(): number {
      return this._order;
    }

    get propertyKey(): string {
      return this._propertyKey;
    }

    get scope(): string {
      return this._scope;
    }

    get transient(): boolean {
      return this._transient;
    }

    get value(): string {
      return this._value;
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
          let transient: boolean = Reflect.getMetadata(META_TRANSIENT, cell, propertyKey);
          let order: number = Reflect.getMetadata(META_ORDER, cell, propertyKey);
          let value: string = Reflect.getMetadata(META_VALUE, cell, propertyKey);
          let scope: string = Reflect.getMetadata(META_SCOPE, cell, propertyKey);

          list.push(new Property(cellName, cellType, cellUUID,
            cellClass, transient, order, value, scope, propertyKey));
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

    // TODO: Rekursivität implementieren -> 1 - n Vererbung beachten
    static processProperties(target: Object): string[] {
      if (Reflect.hasOwnMetadata(Cell.META_PROPERTY_KEYS, target)) {
        return Reflect.getMetadata(Cell.META_PROPERTY_KEYS, target);
      }

      if (Reflect.hasOwnMetadata(Cell.META_PROPERTY_KEYS, Object.getPrototypeOf(target))) {
        return Reflect.getMetadata(Cell.META_PROPERTY_KEYS, target);
      }

      return [];
    }
  }
}

export default Cell;




