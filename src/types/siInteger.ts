import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";

namespace SiInteger {
  export const CELL_TYPE = "integer";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiInteger extends SiCell<SiInteger, number> {
}

@CellType(
  SiInteger.CELL_TYPE,
  SiInteger.CELL_UUID
)
class SiIntegerClass extends SiCellClass<SiInteger, number> implements SiInteger {
  toString(): string {
    return this.hasCellValue() ? String(this.getCellValue()) : "NaN";
  }
}

export {SiInteger};
export default SiIntegerClass;
