import SiCellClass, {SiCell} from "../../../siCell";
import {SiCellInjector} from "../siCellInjector";
import CellType from "../../../decorators/cellType";
import Cell from "../../../decorators/cell";
import CellReference from "../../../decorators/cellReference";

namespace SkCheckAndInject {
  export const CELL_TYPE = "cell-injector-check-and-inject-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkCheckAndInject extends SiCell<SkCheckAndInject, void> {
  setCell(cell: SiCell<any, any>): SkCheckAndInject;
}

@CellType(
  SkCheckAndInject.CELL_TYPE,
  SkCheckAndInject.CELL_UUID
)
class SkCheckAndInjectClass extends SiCellClass<SkCheckAndInject, void> implements SkCheckAndInject {

  private cell?: SiCell<any, any>;

  run(): SkCheckAndInject {
    // TODO: Assertion und throw Error mit cell

    if (Cell.Helper.hasProperties(this.cell as SiCell<any, any>)) {
      (<SiCellInjector>this.getController()).injectCells(this.cell as SiCell<any, any>);
    }

    if (CellReference.Helper.hasProperties(this.cell as SiCell<any, any>)) {
      (<SiCellInjector>this.getController()).injectCellReferences(this.cell as SiCell<any, any>);
    }

    return this.getSelf();
  }

  setCell(cell: SiCell<any, any>): SkCheckAndInject {
    this.cell = cell;
    return this.getSelf();
  }
}

export { SkCheckAndInject };
export default SkCheckAndInjectClass;
