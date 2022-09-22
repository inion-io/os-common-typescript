import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";

namespace SiCellInjectorLostCellReference {
  export const CELL_TYPE = "cell-injector-lost-cell-reference";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellInjectorLostCellReference extends SiCell<SiCellInjectorLostCellReference, SiCell<any, any>> {
}

@CellType(
  SiCellInjectorLostCellReference.CELL_TYPE,
  SiCellInjectorLostCellReference.CELL_UUID
)
class SiCellInjectorLostCellReferenceClass extends SiCellClass<SiCellInjectorLostCellReference, SiCell<any, any>>
  implements SiCellInjectorLostCellReference {
}

export {SiCellInjectorLostCellReference};
export default SiCellInjectorLostCellReferenceClass;
