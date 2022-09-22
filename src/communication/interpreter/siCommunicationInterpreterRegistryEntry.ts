import SiCellClass, {SiCell} from "../../siCell";
import SiStringClass, {SiString} from "../../types/siString";
import {SiCommunicationInterpreter} from "./siCommunicationInterpreter";
import Cell from "../../decorators/cell";
import CellType from "../../decorators/cellType";
import Cells from "../../utils/cells";

namespace SiCommunicationInterpreterRegistryEntry {
  export const CELL_TYPE = "communication-interpreter-registry-entry";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCommunicationInterpreterRegistryEntry extends SiCell<SiCommunicationInterpreterRegistryEntry, SiCommunicationInterpreter> {
  getCommand(): SiString;

  setCommand(command: SiString): SiCommunicationInterpreterRegistryEntry;
}

@CellType(
  SiCommunicationInterpreterRegistryEntry.CELL_TYPE,
  SiCommunicationInterpreterRegistryEntry.CELL_UUID
)
class SiCommunicationInterpreterRegistryEntryClass extends SiCellClass<SiCommunicationInterpreterRegistryEntry, SiCommunicationInterpreter>
  implements SiCommunicationInterpreterRegistryEntry {

  @Cell(SiStringClass)
  private command?: SiString;

  getCommand(): SiString {
    return this.command as SiString;
  }

  setCommand(command: SiString): SiCommunicationInterpreterRegistryEntry {
    return this.swapSubCell(this.command, command);
  }
}

export {SiCommunicationInterpreterRegistryEntry};
export default SiCommunicationInterpreterRegistryEntryClass;
