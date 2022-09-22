import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import SiCommunicationMessageClass, {SiCommunicationMessage} from "../siCommunicationMessage";
import {
  SiCommunicationInterpreterRegistry
} from "../interpreter/siCommunicationInterpreterRegistry";
import SiStringClass from "../../types/siString";
import Cells from "../../utils/cells";

namespace SkProcessRequest {
  export const CELL_TYPE = "communication-manager-process-request-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkProcessRequest extends SiCell<SkProcessRequest, SiCommunicationMessage> {}

@CellType(
  SkProcessRequest.CELL_TYPE,
  SkProcessRequest.CELL_UUID
)
class SkProcessRequestClass extends SiCellClass<SkProcessRequest, SiCommunicationMessage> implements SkProcessRequest {

  async runAsync(): Promise<SkProcessRequest> {
    // TODO: Assertions für Value

    let registry = this.getController().getSubCell<SiCommunicationInterpreterRegistry>(
      Cells.Identifier.type(SiCommunicationInterpreterRegistry.CELL_TYPE));

    let interpreter = registry?.getInterpreter(this.getCellValue()!);
    let response: SiCommunicationMessage | undefined;

    if (interpreter !== undefined) {
      response = await interpreter.createTransientInstance().processRequest(this.getCellValue()!);

      if (response === undefined) {
        response = this.createTransientCell(SiCommunicationMessageClass);
        response?.setCommand(this.createTransientCell(SiStringClass, this.getCellValue()!.getCommand().getCellValue())!);
        response?.setPayload(this.createTransientCell(SiStringClass, "void")!);
      }
    } else {
      response = this.createTransientCell(SiCommunicationMessageClass);
      response?.setCommand(this.createTransientCell(SiStringClass, "error")!);
      response?.setPayload(this.createTransientCell(SiStringClass, "no interpreter found for command: " + this.getCellValue()!.getCommand().getCellValue())!);
    }

    this.setCellValue(response as SiCommunicationMessage);

    return this.getSelf();
  }
}

export {SkProcessRequest};
export default SkProcessRequestClass;
