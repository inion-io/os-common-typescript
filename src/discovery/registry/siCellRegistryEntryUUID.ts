import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";

namespace SiCellRegistryEntryUUID {
  export const CELL_TYPE = "cell-registry-entry-uuid";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellRegistryEntryUUID extends SiCell<SiCellRegistryEntryUUID, string> {
}

@CellType(
  SiCellRegistryEntryUUID.CELL_TYPE,
  SiCellRegistryEntryUUID.CELL_UUID
)
class SiCellRegistryEntryUUIDClass extends SiCellClass<SiCellRegistryEntryUUID, string> implements SiCellRegistryEntryUUID {
}

export {SiCellRegistryEntryUUID};
export default SiCellRegistryEntryUUIDClass;

