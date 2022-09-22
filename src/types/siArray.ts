import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";

namespace SiArray {
  export const CELL_TYPE = "array";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiArray<V> extends SiCell<SiArray<V>, V[]> {
  push(value: V): void;
}

@CellType(
  SiArray.CELL_TYPE,
  SiArray.CELL_UUID
)
class SiArrayClass<V> extends SiCellClass<SiArray<V>, V[]> implements SiArray<V> {
  setCellValueAsString(value: string): SiArray<V> {
    try {
      this.cellValue = JSON.parse(value);
    } catch (error) {
      this.cellValue = undefined;
    }

    return this.getSelf();
  }

  getCellValueAsString(): string {
    return this.hasCellValue() ? JSON.stringify(this.getCellValue()) : "[]";
  }

  getCellValueAsObject(): object | undefined {
    return super.getCellValueAsObject();
  }

  push(value: V): void {
    if (this.cellValue === undefined) {
      this.cellValue = [];
    }
    this.cellValue.push(value);
  }
}

export { SiArray };
export default SiArrayClass;

