import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import {SiCellAnalyzerRegistry} from "../siCellAnalyzerRegistry";
import SiCellAnalyzerRegistryEntryClass, {SiCellAnalyzerRegistryEntry} from "../siCellAnalyzerRegistryEntry";
import SiCellAnalyzerRegistryLazyEntryClass from "../siCellAnalyzerRegistryLazyEntry";
import Cells from "../../../utils/cells";

namespace SkProcessCell {
  export const CELL_TYPE = "cell-analyzer-registry-process-cell-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkProcessCell extends SiCell<SkProcessCell, SiCell<any, any>> {
}

@CellType(
  SkProcessCell.CELL_TYPE,
  SkProcessCell.CELL_UUID
)
class SkProcessCellClass extends SiCellClass<SkProcessCell, SiCell<any, any>> implements SkProcessCell {
  run(): SkProcessCell {
    // TODO: Assertion und throw Error mit value
    if (!this.hasCellValue()) {
      return this.getSelf();
    }

    if (!(<SiCellAnalyzerRegistry>this.getController()).isFinished().getCellValue()) {
      this.buildCell(SiCellAnalyzerRegistryLazyEntryClass, Cells.UUID.random(), this.getController())
        ?.setCellValue(this.getCellValue() as SiCell<any, any>);
    } else {
      this.getController().getSubCells<SiCellAnalyzerRegistryEntry>(SiCellAnalyzerRegistryEntryClass)
        .forEach((entry) => {
          entry.getCellValue()?.setCellValue(this.getCellValue() as SiCell<any, any>).run();
        })
    }

    return this.getSelf();
  }

}

export {SkProcessCell};
export default SkProcessCellClass;
