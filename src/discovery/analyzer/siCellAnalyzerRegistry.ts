import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import SiBooleanClass, {SiBoolean} from "../../types/siBoolean";
import SkProcessCellClass, {SkProcessCell} from "./skills/skProcessCell";
import SkRegisterCellsClass, {SkRegisterCells} from "./skills/skRegisterCells";
import SkFinishClass, {SkFinish} from "./skills/skFinish";

namespace SiCellAnalyzerRegistry {
  export const CELL_TYPE = "cell-analyzer-registry";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellAnalyzerRegistry extends SiCell<SiCellAnalyzerRegistry, void> {
  finish(): void;

  process(cell: SiCell<any, any>): void;

  registerCells(): void;

  register(analyzer: SiCellAnalyzerRegistry): void;

  isFinished(): SiBoolean;
}

@CellType(
  SiCellAnalyzerRegistry.CELL_TYPE,
  SiCellAnalyzerRegistry.CELL_UUID
)
class SiCellAnalyzerRegistryClass extends SiCellClass<SiCellAnalyzerRegistry, void> implements SiCellAnalyzerRegistry {

  private skFinish?: SkFinish;
  private skProcessCell?: SkProcessCell;
  private skRegisterCells?: SkRegisterCells;
  private finished?: SiBoolean;

  create(): SiCellAnalyzerRegistry {
    this.skFinish = this.buildCell(SkFinishClass, "skFinish");
    this.skProcessCell = this.buildCell(SkProcessCellClass, "skProcessCell");
    this.skRegisterCells = this.buildCell(SkRegisterCellsClass, "skRegisterCells");
    this.finished = this.buildCell(SiBooleanClass, "finished")?.setCellValue(false);
    this.setCreated(true);

    return this.getSelf();
  }

  finish(): void {
    if (this.finished?.getCellValue()) {
      throw new Error("TODO: Exception Handling. Registry is finished");
    }

    this.finished?.setCellValue(true);

    try {
      this.skFinish?.createTransientInstance()
        .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  isFinished(): SiBoolean {
    return this.finished as SiBoolean;
  }

  process(cell: SiCell<any, any>): void {
    try {
      this.skProcessCell?.createTransientInstance()
        .setCellValue(cell)
        .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  register(analyzer: SiCellAnalyzerRegistry): void {
  }

  registerCells(): void {
    try {
      this.skRegisterCells?.createTransientInstance()
        .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }
}

export {SiCellAnalyzerRegistry};
export default SiCellAnalyzerRegistryClass;
