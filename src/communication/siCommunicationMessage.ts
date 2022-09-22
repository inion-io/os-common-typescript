import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";
import SiStringClass, {SiString} from "../types/siString";
import Cell from "../decorators/cell";

namespace SiCommunicationMessage {
  export const CELL_TYPE = "communication-message";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCommunicationMessage extends SiCell<SiCommunicationMessage, void> {
  getCommand(): SiString;

  getPayload(): SiCell<any, any>;

  getSender(): SiString;

  setCommand(command: SiString): SiCommunicationMessage;

  setPayload(payload: SiCell<any, any>): SiCommunicationMessage;
}

@CellType(
  SiCommunicationMessage.CELL_TYPE,
  SiCommunicationMessage.CELL_UUID
)
class SiCommunicationMessageClass extends SiCellClass<SiCommunicationMessage, void> implements SiCommunicationMessage {
  @Cell(SiStringClass)
  private command?: SiString;
  @Cell(SiStringClass)
  private sender?: SiString;
  @Cell(SiCellClass)
  private payload?: SiCell<any, any> = undefined;

  afterCreate() {
    this.sender?.setCellValue(this.root().getCellURI());
  }

  getCommand(): SiString {
    return this.command as SiString;
  }

  getPayload(): SiCell<any, any> {
    return this.payload as SiCell<any, any>;
  }

  getSender(): SiString {
    return this.sender as SiString;
  }

  setCommand(command: SiString): SiCommunicationMessage {
    return this.swapSubCell(this.command, command);
  }

  setPayload(payload: SiCell<any, any>): SiCommunicationMessage {
    return this.swapSubCell("payload", payload);
  }
}

export {SiCommunicationMessage};
export default SiCommunicationMessageClass;
