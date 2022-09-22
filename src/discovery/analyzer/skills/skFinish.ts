import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import {SiCellAnalyzerRegistry} from "../siCellAnalyzerRegistry";
import SiCellAnalyzerRegistryLazyEntryClass, {
  SiCellAnalyzerRegistryLazyEntry
} from "../siCellAnalyzerRegistryLazyEntry";

namespace SkFinish {
  export const CELL_TYPE = "cell-analyzer-registry-finish-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkFinish extends SiCell<SkFinish, void> {
}

@CellType(
  SkFinish.CELL_TYPE,
  SkFinish.CELL_UUID
)
class SkFinishClass extends SiCellClass<SkFinish, void> implements SkFinish {
  run(): SkFinish {
    this.getController().getSubCells<SiCellAnalyzerRegistryLazyEntry>(SiCellAnalyzerRegistryLazyEntryClass)
      .forEach((entry) => {
        (<SiCellAnalyzerRegistry>this.getController()).process(entry.getCellValue() as SiCell<any, any>);
      })

    this.getController().destroySubCells(SiCellAnalyzerRegistryLazyEntryClass);

    return this.getSelf();
  }
}

export {SkFinish};
export default SkFinishClass;
