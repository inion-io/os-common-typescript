import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";
import Cell from "../../decorators/cell";
import SiCellRegistryEntryClassClass from "./siCellRegistryEntryClass";
import SiCellRegistryEntryTypeClass, {SiCellRegistryEntryType} from "./siCellRegistryEntryType";
import SiCellRegistryEntryUUIDClass, {SiCellRegistryEntryUUID} from "./siCellRegistryEntryUUID";

namespace SiCellRegistryEntry {
  export const CELL_TYPE = "cell-registry-entry";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellRegistryEntry extends SiCell<SiCellRegistryEntry, void> {}

@CellType(
  SiCellRegistryEntry.CELL_TYPE,
  SiCellRegistryEntry.CELL_UUID
)
class SiCellRegistryEntryClass extends SiCellClass<SiCellRegistryEntry, void> implements SiCellRegistryEntry {
  @Cell(SiCellRegistryEntryClassClass)
  private entryClass?: SiCellRegistryEntryClass;
  @Cell(SiCellRegistryEntryTypeClass)
  private entryType?: SiCellRegistryEntryType;
  @Cell(SiCellRegistryEntryUUIDClass)
  private entryUUID?: SiCellRegistryEntryUUID;
}

export {SiCellRegistryEntry};
export default SiCellRegistryEntryClass;

