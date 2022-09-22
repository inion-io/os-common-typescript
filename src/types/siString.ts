import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";

namespace SiString {
  export const CELL_TYPE = "string";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiString extends SiCell<SiString, string> {}

@CellType(
  SiString.CELL_TYPE,
  SiString.CELL_UUID
)
class SiStringClass extends SiCellClass<SiString, string> implements SiString {}

export { SiString };
export default SiStringClass;
