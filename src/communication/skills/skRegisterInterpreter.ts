import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import {SiCommunicationInterpreter} from "../interpreter/siCommunicationInterpreter";
import SiCommunicationInterpreterRegistryClass
  from "../interpreter/siCommunicationInterpreterRegistry";
import SiCommunicationInterpreterRegistryEntryClass
  from "../interpreter/siCommunicationInterpreterRegistryEntry";

namespace SkRegisterInterpreter {
  export const CELL_TYPE = "communication-manager-register-interpreter-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkRegisterInterpreter extends SiCell<SkRegisterInterpreter, SiCommunicationInterpreter> {}

@CellType(
  SkRegisterInterpreter.CELL_TYPE,
  SkRegisterInterpreter.CELL_UUID
)
class SkRegisterInterpreterClass extends SiCellClass<SkRegisterInterpreter, SiCommunicationInterpreter>
  implements SkRegisterInterpreter {

  run(): SkRegisterInterpreter {
    // TODO: Assertions für Value
    // TODO: Check nach duplicated Commands und Exception werfen

    let registry = this.getController().getSubCell(SiCommunicationInterpreterRegistryClass);
    let entry = registry?.createCell(SiCommunicationInterpreterRegistryEntryClass);
    entry?.setCommand(this.getCellValue()?.getCommand()!);
    entry?.setCellValue(this.getCellValue()!);

    return this.getSelf();
  }
}

export {SkRegisterInterpreter};
export default SkRegisterInterpreterClass;
