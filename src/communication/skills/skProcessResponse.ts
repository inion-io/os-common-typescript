import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import SiCommunicationMessageClass, {SiCommunicationMessage} from "../siCommunicationMessage";
import SiCommunicationInterpreterRegistryClass
  from "../interpreter/siCommunicationInterpreterRegistry";
import SiStringClass from "../../types/siString";

namespace SkProcessResponse {
  export const CELL_TYPE = "communication-manager-process-response-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkProcessResponse extends SiCell<SkProcessResponse, SiCommunicationMessage> {
}

@CellType(
  SkProcessResponse.CELL_TYPE,
  SkProcessResponse.CELL_UUID
)
class SkProcessResponseClass extends SiCellClass<SkProcessResponse, SiCommunicationMessage> implements SkProcessResponse {
  async runAsync(): Promise<SkProcessResponse> {
    // TODO: Assertions für Value

    let registry = this.getController().getSubCell(SiCommunicationInterpreterRegistryClass);
    let interpreter = registry?.getInterpreter(this.getCellValue()!);
    let response;

    if (interpreter !== undefined) {
      response = await interpreter.createTransientInstance().processResponse(this.getCellValue()!);

      if (response === undefined) {
        response = this.createTransientCell(SiCommunicationMessageClass);
        response.setCommand(this.createTransientCell(SiStringClass, this.getCellValue()!.getCommand().getCellValue())!);
        response.setPayload(this.createTransientCell(SiStringClass, "void")!);
      }
    } else {
      response = this.createTransientCell(SiCommunicationMessageClass);
      response.setCommand(this.createTransientCell(SiStringClass, "error")!);
      response.setPayload(this.createTransientCell(SiStringClass, "no interpreter found for message: " + this.getCellValue()!.toString())!);
    }

    this.setCellValue(response);

    return this.getSelf();
  }
}

export {SkProcessResponse};
export default SkProcessResponseClass;
