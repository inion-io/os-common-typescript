import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";

namespace SiCellAnalyzerRegistryLazyEntry {
  export const CELL_TYPE = "cell-analyzer-registry-lazy-entry";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellAnalyzerRegistryLazyEntry extends SiCell<SiCellAnalyzerRegistryLazyEntry, SiCell<any, any>> {
}

@CellType(
  SiCellAnalyzerRegistryLazyEntry.CELL_TYPE,
  SiCellAnalyzerRegistryLazyEntry.CELL_UUID
)
class SiCellAnalyzerRegistryLazyEntryClass extends SiCellClass<SiCellAnalyzerRegistryLazyEntry, SiCell<any, any>>
  implements SiCellAnalyzerRegistryLazyEntry {
}

export {SiCellAnalyzerRegistryLazyEntry};
export default SiCellAnalyzerRegistryLazyEntryClass;
