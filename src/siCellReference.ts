import CellType from "./decorators/cellType";
import SiCellClass, {SiCell} from "./siCell";

namespace SiCellReference {
  export const CELL_TYPE = "cell-reference";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellReference extends SiCell<SiCellReference, SiCell<any, any>> {
}

@CellType(
  SiCellReference.CELL_TYPE,
  SiCellReference.CELL_UUID
)
class SiCellReferenceClass extends SiCellClass<SiCellReference, SiCell<any, any>> implements SiCellReference {
}

export {SiCellReference};
export default SiCellReferenceClass;
