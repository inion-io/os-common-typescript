import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import Cells from "../../../utils/cells";
import Cell from "../../../decorators/cell";

namespace SkInjectCells {
  export const CELL_TYPE = "cell-injector-inject-module-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkInjectCells extends SiCell<SkInjectCells, void> {
  setCell(cell: SiCell<any, any>): SkInjectCells;
}

@CellType(
  SkInjectCells.CELL_TYPE,
  SkInjectCells.CELL_UUID
)
class SkInjectCellsClass extends SiCellClass<SkInjectCells, void> implements SkInjectCells {

  private cell?: SiCell<any, any>;

  run(): SkInjectCells {
    // TODO: Assertion und throw Error mit cell

    Cell.Helper.getProperties(this.cell as SiCell<any, any>).forEach((property) => {
      if (property.transient) {
        return;
      }

      let cellName = property.cellName;
      let cellType = property.cellType;
      let cellValue = property.value;
      let cellClass = property.cellClass;

      if (cellName === undefined || cellName.length === 0) {
        cellName = property.propertyKey;
      }

      let injectCell: SiCell<any, any> | undefined;

      if (cellType !== undefined && cellType.length > 0) {
        injectCell = this.createCell(Cells.Identifier.type(cellType), cellName, this.cell);
      } else if (cellClass !== undefined) {
        injectCell = this.createCell(cellClass, cellName, this.cell);
      }

      if (injectCell !== undefined) {
        if (cellValue !== undefined && cellValue.length > 0) {
          injectCell.setCellValueAsString(cellValue);
        }

        Reflect.set(this.cell as Object, property.propertyKey, injectCell);
        injectCell.setControllerPropertyKey(property.propertyKey);
      }
    })

    return this.getSelf();
  }

  setCell(cell: SiCell<any, any>): SkInjectCells {
    this.cell = cell;
    return this.getSelf();
  }
}

export { SkInjectCells };
export default SkInjectCellsClass;
