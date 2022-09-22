import CellType from "../../../decorators/cellType";
import SiCommunicationInterpreterClass, {
  SiCommunicationInterpreter
} from "../../../communication/interpreter/siCommunicationInterpreter";
import SiStringClass, {SiString} from "../../../types/siString";
import Cell from "../../../decorators/cell";
import {SiCommunicationMessage} from "../../../communication/siCommunicationMessage";

namespace SiErrorInterpreter {
  export const CELL_TYPE = "communication-error-interpreter";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const COMMAND = "error";
}

interface SiErrorInterpreter extends SiCommunicationInterpreter {
}

@CellType(
  SiErrorInterpreter.CELL_TYPE,
  SiErrorInterpreter.CELL_UUID
)
class SiErrorInterpreterClass extends SiCommunicationInterpreterClass implements SiErrorInterpreter {
  @Cell(SiStringClass, Cell.Option.value(SiErrorInterpreter.COMMAND))
  private command?: SiString;

  getCommand(): SiString {
    return this.command as SiString;
  }

  async processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage> {
    //this.log().debug("Receive Request: " + message.toString());
    return message;
  }

  async processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage> {
    //this.log().debug("Receive Response: " + message.toString());
    return message;
  }
}

export {SiErrorInterpreter};
export default SiErrorInterpreterClass;
