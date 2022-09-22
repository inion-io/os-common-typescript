import SiCellClass, {SiCell} from "../siCell";
import SiLoggerClass, {SiLogger} from "./siLogger";
import CellType from "../decorators/cellType";

namespace SiLogManager {
  export const CELL_TYPE = "log-manager";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiLogManager extends SiCell<SiLogManager, void> {
  getLogger(cell: SiCell<any, any>): SiLogger;
}

@CellType(
  SiLogManager.CELL_TYPE,
  SiLogManager.CELL_UUID
)
class SiLogManagerClass extends SiCellClass<SiLogManager, void> implements SiLogManager {

  private logger?: SiLogger;

  create(): SiLogManager {
    this.logger = this.createCell(SiLoggerClass);
    this.setCreated(true);
    return this.getSelf();
  }

  getLogger(cell: SiCell<any, any>): SiLogger {
    return this.logger as SiLogger;
  }
}

export {SiLogManager};
export default SiLogManagerClass;

