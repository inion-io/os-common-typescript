import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";

namespace SiURL {
  export const CELL_TYPE = "url";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiURL extends SiCell<SiURL, string> {}

@CellType(
  SiURL.CELL_TYPE,
  SiURL.CELL_UUID
)
class SiURLClass extends SiCellClass<SiURL, string> implements SiURL {}

export { SiURL };
export default SiURLClass;
