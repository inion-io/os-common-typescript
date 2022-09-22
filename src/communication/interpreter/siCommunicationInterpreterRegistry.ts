import SiCellClass, {SiCell} from "../../siCell";
import {SiCommunicationMessage} from "../siCommunicationMessage";
import {SiCommunicationInterpreter} from "./siCommunicationInterpreter";
import SiCommunicationInterpreterRegistryEntryClass
  from "./siCommunicationInterpreterRegistryEntry";
import CellType from "../../decorators/cellType";

namespace SiCommunicationInterpreterRegistry {
  export const CELL_TYPE = "communication-interpreter-registry";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCommunicationInterpreterRegistry extends SiCell<SiCommunicationInterpreterRegistry, void> {
  getInterpreter(message: SiCommunicationMessage): SiCommunicationInterpreter | undefined;
}

@CellType(
  SiCommunicationInterpreterRegistry.CELL_TYPE,
  SiCommunicationInterpreterRegistry.CELL_UUID
)
class SiCommunicationInterpreterRegistryClass extends SiCellClass<SiCommunicationInterpreterRegistry, void>
  implements SiCommunicationInterpreterRegistry {

  getInterpreter(message: SiCommunicationMessage): SiCommunicationInterpreter | undefined {

    for (let entry of this.getSubCells(SiCommunicationInterpreterRegistryEntryClass)) {
      if (entry.getCommand().getCellValue() === message.getCommand().getCellValue()) {
        return entry.getCellValue();
      }
    }

    return undefined;
  }
}

export {SiCommunicationInterpreterRegistry};
export default SiCommunicationInterpreterRegistryClass;

