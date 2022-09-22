import CellType from "../../../decorators/cellType";
import SiCommunicationInterpreterClass, {
  SiCommunicationInterpreter
} from "../../../communication/interpreter/siCommunicationInterpreter";
import SiStringClass, {SiString} from "../../../types/siString";
import Cell from "../../../decorators/cell";
import SiCommunicationMessageClass, {
  SiCommunicationMessage
} from "../../../communication/siCommunicationMessage";
import Cells from "../../../utils/cells";
import {SiRemoteCellReference} from "../siRemoteCellReference";
import SiArrayClass, {SiArray} from "../../../types/siArray";
import SiErrorPayloadClass from "./payload/siErrorPayload";
import {SiExecuteCellSkillPayload} from "./payload/siExecuteCellSkillPayload";
import {SiCell} from "../../../siCell";

namespace SiExecuteCellSkillInterpreter {
  export const CELL_TYPE = "execute-cell-skill-communication-interpreter";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const COMMAND = "execute-cell-skill";
}

interface SiExecuteCellSkillInterpreter extends SiCommunicationInterpreter {}

@CellType(
  SiExecuteCellSkillInterpreter.CELL_TYPE,
  SiExecuteCellSkillInterpreter.CELL_UUID
)
class SiExecuteCellSkillInterpreterClass extends SiCommunicationInterpreterClass implements SiExecuteCellSkillInterpreter {
  @Cell(SiStringClass, Cell.Option.value(SiExecuteCellSkillInterpreter.COMMAND))
  private command?: SiString;

  getCommand(): SiString {
    return this.command as SiString;
  }

  async processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined>{
    //this.log().debug("Receive Request: " + message.toString());

    let response = this.createTransientCell(SiCommunicationMessageClass);

    // TODO: Use private helper method to remove duplicate code
    if (message.getPayload().getCellType() !== SiExecuteCellSkillPayload.CELL_TYPE) {
      response.setCommand(this.createTransientCell(SiStringClass, "error"));
      response.setPayload(this.createTransientCell(SiErrorPayloadClass, "invalid message payload"));

      return Promise.resolve(response);
    }

    let payload: SiExecuteCellSkillPayload = <SiExecuteCellSkillPayload> message.getPayload();
    let cellURI = payload.getURI();
    let skillName = payload.getSkillName();
    let parameters = payload.getParameters();

    // TODO: Use private helper method to remove duplicate code
    if (cellURI === undefined || !cellURI.hasCellValue() || skillName === undefined || !skillName.hasCellValue()) {
      response.setCommand(this.createTransientCell(SiStringClass, "error"));
      response.setPayload(this.createTransientCell(SiErrorPayloadClass, "invalid message payload"));

      return Promise.resolve(response);
    }

    let cell = this.root().getSubCell<SiRemoteCellReference>(Cells.Identifier.uri(cellURI.getCellValue()!));

    if (cell !== undefined) {
      let obj = await cell.executeMethod(skillName, parameters);1

      response.setCommand(this.createTransientCell(SiStringClass, SiExecuteCellSkillInterpreter.COMMAND));
      response.setPayload(obj as SiCell<any, any>);

    } else {
      response.setCommand(this.createTransientCell(SiStringClass, "error")!);
      response.setPayload(this.createTransientCell(SiErrorPayloadClass, "No cell found for uri " + cellURI.getCellValue()));
    }

    return Promise.resolve(response);
  }

  async processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined> {
    //this.log().debug("Receive Response: " + message.toString());
    return Promise.resolve(message);
  }
}

export { SiExecuteCellSkillInterpreter };
export default SiExecuteCellSkillInterpreterClass;
