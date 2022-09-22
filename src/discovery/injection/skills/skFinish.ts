import SiCellClass, {SiCell} from "../../../siCell";
import {SiCellInjector} from "../siCellInjector";
import CellType from "../../../decorators/cellType";
import SiCellInjectorLazyCellReferenceClass from "../siCellInjectorLazyCellReference";

namespace SkFinish {
  export const CELL_TYPE = "cell-injector-finish-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkFinish extends SiCell<SkFinish, void> {}

@CellType(
  SkFinish.CELL_TYPE,
  SkFinish.CELL_UUID
)
class SkFinishClass extends SiCellClass<SkFinish, void> implements SkFinish {

  private cell?: SiCell<any, any>;

  run(): SkFinish {
    let initializedCells:string[] = [];

    this.getController().getSubCells(SiCellInjectorLazyCellReferenceClass).forEach((subCell) => {
      if (subCell.getCellValue() === undefined) {
        return;
      } else if (initializedCells.indexOf(subCell.getCellValue()!.getCellURI()) > -1) {
        return;
      }

      initializedCells.push(subCell.getCellValue()!.getCellURI());

      (<SiCellInjector>this.getController()).injectCellReferences(subCell.getCellValue() as SiCell<any, any>);
    });

    initializedCells.length = 0;

    this.getController().getSubCells(SiCellInjectorLazyCellReferenceClass).forEach((subCell) => {
      if (subCell.getCellValue() === undefined) {
        return;
      } else if (initializedCells.indexOf(subCell.getCellValue()!.getCellURI()) > -1) {
        return;
      }

      subCell.getCellValue()?.afterCellsSet();

      initializedCells.push(subCell.getCellValue()!.getCellURI());
    });

    initializedCells.length = 0;

    this.getController().destroySubCells(SiCellInjectorLazyCellReferenceClass);

    return this.getSelf();
  }

  setCell(cell: SiCell<any, any>): SkFinish {
    this.cell = cell;
    return this.getSelf();
  }
}

export { SkFinish };
export default SkFinishClass;
