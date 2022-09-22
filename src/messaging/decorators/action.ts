import "reflect-metadata";
import {SiCell} from "../../siCell";

function Action(eventName: string, ...options: Action.Option[]): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    Reflect.defineMetadata(Action.META_EVENT_NAME, eventName, target, propertyKey);

    options.forEach((option) => {
      Reflect.defineMetadata(option.getKey(), option.getValue(), target, propertyKey);
    });

    let propertyKeys: string[] = [];

    if (Reflect.hasOwnMetadata(Action.META_PROPERTY_KEYS, target)) {
      propertyKeys = Reflect.getMetadata(Action.META_PROPERTY_KEYS, target);
    }

    propertyKeys.push(propertyKey);

    Reflect.defineMetadata(Action.META_PROPERTY_KEYS, propertyKeys, target);
  }
}

namespace Action {
  export const META_PROPERTY_KEYS = "eventDecoratorMetaPropertyKeys";
  export const META_EVENT_NAME = "eventName";

  export class Option {
    key: string;
    value: string | number | boolean;

    constructor(key: string, value: string | number | boolean) {
      this.key = key;
      this.value = value;
    }

    /*
    static cellName(name: string): Option {
      return new Option(META_CELL_NAME, name);
    }

    static transient(transient: boolean): Option {
      return new Option(META_TRANSIENT, transient);
    }

    static order(order: number): Option {
      return new Option(META_ORDER, order);
    }

    static value(value: string): Option {
      return new Option(META_VALUE, value);
    }*/

    getKey(): string {
      return this.key;
    }

    getValue(): string | number | boolean {
      return this.value;
    }
  }

  export class Property {
    private readonly _eventName: string;
    private readonly _propertyKey: string;

    constructor(eventName: string, propertyKey: string) {
      this._eventName = eventName;
      this._propertyKey = propertyKey;
    }

    get eventName(): string {
      return this._eventName;
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
          let eventName: string = Reflect.getMetadata(META_EVENT_NAME, cell, propertyKey);

          list.push(new Property(eventName, propertyKey));
        })
      }

      return list;
    }

    static hasProperties(cell: SiCell<any, any>): boolean {
      let properties: string[] = Reflect.getMetadata(META_PROPERTY_KEYS, cell);
      return properties !== undefined && properties.length > 0;
    }
  }
}

export default Action;

