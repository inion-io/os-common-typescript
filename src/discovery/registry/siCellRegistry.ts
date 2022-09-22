import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";
import SkProcessClassesClass, {SkProcessClasses} from "./skills/skProcessClasses";
import Cells from "../../utils/cells";
import SkFindCellClassClass, {SkFindCellClass} from "./skills/skFindCellClass";

namespace SiCellRegistry {
  export const CELL_TYPE = "cell-registry";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellRegistry extends SiCell<SiCellRegistry, void> {
  findCellClass(cellIdentifier: Cells.Identifier): (() => SiCellClass<any, any>) | undefined;

  processClasses(cellClasses: any[]): SiCellRegistry;
}

@CellType(
  SiCellRegistry.CELL_TYPE,
  SiCellRegistry.CELL_UUID
)
class SiCellRegistryClass extends SiCellClass<SiCellRegistry, void> implements SiCellRegistry {
  private skFindCellClass?: SkFindCellClass;
  private skProcessClasses?: SkProcessClasses;

  create(): SiCellRegistry {
    this.skFindCellClass = this.buildCell(SkFindCellClassClass, "skFindCellClass");
    this.skProcessClasses = this.buildCell(SkProcessClassesClass, "skProcessClasses");

    return super.create();
  }

  findCellClass(cellIdentifier: Cells.Identifier): (() => SiCellClass<any, any>) | undefined {
    try {
      return this.skFindCellClass?.createTransientInstance()
      .setCellIdentifier(cellIdentifier)
      .returnAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  processClasses(cellClasses: any[]): SiCellRegistry {
    try {
      this.skProcessClasses?.createTransientInstance()
      .setClasses(cellClasses)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }

    return this.getSelf();
  }
}

export {SiCellRegistry};
export default SiCellRegistryClass;

