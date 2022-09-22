import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";

namespace SiCellAnalyzer {
  export const CELL_TYPE = "cell-analyzer";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellAnalyzer extends SiCell<SiCellAnalyzer, SiCell<any, any>> {}

@CellType(
  SiCellAnalyzer.CELL_TYPE,
  SiCellAnalyzer.CELL_UUID
)
class SiCellAnalyzerClass extends SiCellClass<SiCellAnalyzer, SiCell<any, any>> implements SiCellAnalyzer {}

export { SiCellAnalyzer };
export default SiCellAnalyzerClass;

