import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";

namespace SiCellRegistryEntryType {
  export const CELL_TYPE = "cell-registry-entry-type";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellRegistryEntryType extends SiCell<SiCellRegistryEntryType, string> {
}

@CellType(
  SiCellRegistryEntryType.CELL_TYPE,
  SiCellRegistryEntryType.CELL_UUID
)
class SiCellRegistryEntryTypeClass extends SiCellClass<SiCellRegistryEntryType, string> implements SiCellRegistryEntryType {
}

export {SiCellRegistryEntryType};
export default SiCellRegistryEntryTypeClass;

