import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import SiCellAnalyzerRegistryEntryClass, {SiCellAnalyzerRegistryEntry} from "../siCellAnalyzerRegistryEntry";
import {SiCellAnalyzer} from "../siCellAnalyzer";
import Cells from "../../../utils/cells";

namespace SkRegisterCells {
  export const CELL_TYPE = "cell-analyzer-registry-register-module-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkRegisterCells extends SiCell<SkRegisterCells, void> {
}

@CellType(
  SkRegisterCells.CELL_TYPE,
  SkRegisterCells.CELL_UUID
)
class SkRegisterCellsClass extends SiCellClass<SkRegisterCells, void> implements SkRegisterCells {
  run(): SkRegisterCells {
    this.root().getSubCells<SiCellAnalyzer>(Cells.Identifier.type(SiCellAnalyzer.CELL_TYPE)).forEach((subCell) => {
      let entry = this.buildCell<SiCellAnalyzerRegistryEntry>(SiCellAnalyzerRegistryEntryClass,
        subCell.getCellName(), this.getController());

      entry?.setCellValue(subCell);
    });

    return this.getSelf();
  }

}

export {SkRegisterCells};
export default SkRegisterCellsClass;
