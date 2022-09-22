import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";

namespace SkStart {
  export const CELL_TYPE = "remote-discovery-manager-start-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkStart extends SiCell<SkStart, void> {}

@CellType(
  SkStart.CELL_TYPE,
  SkStart.CELL_UUID
)
class SkStartClass extends SiCellClass<SkStart, void> implements SkStart {

  private cell?: SiCell<any, any>;

  run(): SkStart {
    return this.getSelf();
  }

  setCell(cell: SiCell<any, any>): SkStart {
    this.cell = cell;
    return this.getSelf();
  }
}

export { SkStart };
export default SkStartClass;
