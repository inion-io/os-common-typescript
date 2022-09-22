import SiCellClass, {SiCell} from "../siCell";
import {SiString} from "../types/siString";

namespace SiEventMessage {
  export const CELL_TYPE = "event-message";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiEventMessage<C extends SiCell<any, any>> extends SiCell<C, void> {
  getEventName(): SiString;

  test():void;
}

abstract class SiEventMessageClass<C extends SiCell<any, any>> extends SiCellClass<C, void> implements SiEventMessage<C> {
  protected abstract eventName?: SiString;

  getEventName(): SiString {
    return this.eventName as SiString;
  }

  test(): void {
  }
}

export {SiEventMessage};
export default SiEventMessageClass;

