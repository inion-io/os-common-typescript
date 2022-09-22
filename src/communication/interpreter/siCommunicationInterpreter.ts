import SiCellClass, {SiCell} from "../../siCell";
import {SiString} from "../../types/siString";
import {SiCommunicationMessage} from "../siCommunicationMessage";

namespace SiCommunicationInterpreter {
  export const CELL_TYPE = "communication-interpreter";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCommunicationInterpreter extends SiCell<SiCommunicationInterpreter, void> {
  getCommand(): SiString;

  processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined>;

  processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined>;

  setMessage(message: SiCommunicationMessage): SiCommunicationInterpreter;
}

abstract class SiCommunicationInterpreterClass extends SiCellClass<SiCommunicationInterpreter, void>
  implements SiCommunicationInterpreter {

  protected message?: SiCommunicationMessage;

  abstract getCommand(): SiString;

  abstract processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined>;

  abstract processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined>;

  setMessage(message: SiCommunicationMessage): SiCommunicationInterpreter {
    this.message = message;
    return this.getSelf();
  }
}

export { SiCommunicationInterpreter };
export default SiCommunicationInterpreterClass

