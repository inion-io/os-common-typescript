import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";
import Cells from "../utils/cells";

namespace SiList {
  export const CELL_TYPE = "list";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiList<V> extends SiCell<SiList<V>, V[]> {
  push(value: V): void;
}

@CellType(
  SiList.CELL_TYPE,
  SiList.CELL_UUID
)
class SiListClass<V> extends SiCellClass<SiList<V>, V[]> implements SiList<V> {
  getCellValueAsFlatObject(): object | undefined {
    if (!this.hasCellValue()) {
      return undefined;
    }

    let val: any = [];

    this.getCellValue()?.forEach(entry => {
      this.log().debug(Cells.Helper.isCell(entry));
      if (Cells.Helper.isCell(entry)) {
        val.push((<SiCell<any, any>><unknown>entry).toFlatObject(false));
      } else {
        val.push(entry);
      }
    });

    return val;
  }

  getCellValueAsString(): string {
    return this.hasCellValue() ? JSON.stringify(this.getCellValue(), (key, value) => {
      if (key === "rootCell") {
        return;
      }
      return value;
    }) : "[]";
  }

  push(value: V): void {
    if (this.cellValue === undefined) {
      this.cellValue = [];
    }
    this.cellValue.push(value);
  }

  /* TODO: Siehe https://gitlab.sichtweise.online/inion/os/nodejs/common/-/issues/6
  setCellValueAsString(value: string): SiList<V> {
    try {
      let val: [] = JSON.parse(value);
      this.cellValue = [];

      val.forEach(entry => {
        if (Cells.Helper.isCell(entry)) {
          let entryCellType = Reflect.get(entry, SiCell.PROPERTY_CELL_TYPE);
          let entryCell = this.createTransientCell(Cells.Identifier.type(entryCellType));

          if (entryCell === undefined) {
            this.log().debug("Cell type " + entryCellType + " not present in discovery. " +
              "Can not add cell as sub cell.", entry);
            return;
          }

          entryCell.restore(entry);

          this.cellValue!.push(entryCell as unknown as V);
        } else {
          this.cellValue!.push(entry);
        }
      });
    } catch (error) {
      this.log().debug(error);
      this.cellValue = undefined;
    }

    return this.getSelf();
  }*/

  setCellValueAsString(value: string): SiList<V> {
    try {
      this.cellValue = JSON.parse(value);
    } catch (error) {
      this.cellValue = undefined;
    }

    return this.getSelf();
  }
}

export {SiList};
export default SiListClass;

