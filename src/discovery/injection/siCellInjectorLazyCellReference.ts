import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";

namespace SiCellInjectorLazyCellReference {
  export const CELL_TYPE = "cell-injector-lazy-cell-reference";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellInjectorLazyCellReference extends SiCell<SiCellInjectorLazyCellReference, SiCell<any, any>> {
}

@CellType(
  SiCellInjectorLazyCellReference.CELL_TYPE,
  SiCellInjectorLazyCellReference.CELL_UUID
)
class SiCellInjectorLazyCellReferenceClass extends SiCellClass<SiCellInjectorLazyCellReference, SiCell<any, any>>
  implements SiCellInjectorLazyCellReference {
}

export {SiCellInjectorLazyCellReference};
export default SiCellInjectorLazyCellReferenceClass;
