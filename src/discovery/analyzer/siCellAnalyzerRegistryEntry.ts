import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import {SiCellAnalyzer} from "./siCellAnalyzer";

namespace SiCellAnalyzerRegistryEntry {
  export const CELL_TYPE = "cell-analyzer-registry-entry";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellAnalyzerRegistryEntry extends SiCell<SiCellAnalyzerRegistryEntry, SiCellAnalyzer> {
}

@CellType(
  SiCellAnalyzerRegistryEntry.CELL_TYPE,
  SiCellAnalyzerRegistryEntry.CELL_UUID
)
class SiCellAnalyzerRegistryEntryClass extends SiCellClass<SiCellAnalyzerRegistryEntry, SiCellAnalyzer>
  implements SiCellAnalyzerRegistryEntry {
}

export {SiCellAnalyzerRegistryEntry};
export default SiCellAnalyzerRegistryEntryClass;
