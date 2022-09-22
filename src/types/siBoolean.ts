import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";

namespace SiBoolean {
  export const CELL_TYPE = "boolean";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiBoolean extends SiCell<SiBoolean, boolean> {}

@CellType(
  SiBoolean.CELL_TYPE,
  SiBoolean.CELL_UUID
)
class SiBooleanClass extends SiCellClass<SiBoolean, boolean> implements SiBoolean {
  protected value = false;

  setCellValueAsString(value: string): SiBoolean {
    try {
      this.cellValue = Boolean(value).valueOf();
    } catch (error) {
      this.cellValue = false;
    }

    return this.getSelf();
  }
}

export { SiBoolean };
export default SiBooleanClass;
