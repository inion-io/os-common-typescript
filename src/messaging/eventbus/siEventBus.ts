import {SiCell} from "../../siCell";
import {SiEventMessage} from "../siEventMessage";

namespace SiEventBus {
  export const CELL_TYPE = "event-bus";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiEventBus<C extends SiCell<any, any>> extends SiCell<C, void> {
  publish(message: SiEventMessage<any>): void;

  register(cell: SiCell<any, any>): void;

  unregister(cell: SiCell<any, any>): void;
}

export {SiEventBus};

