import CellType from "../decorators/cellType";
import SiCellClass, {SiCell} from "../siCell";
import Cells from "../utils/cells";

namespace SiUUID {
  export const CELL_TYPE = "uuid";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiUUID extends SiCell<SiUUID, Cells.UUID> {
}

@CellType(
  SiUUID.CELL_TYPE,
  SiUUID.CELL_UUID
)
class SiUUIDClass extends SiCellClass<SiUUID, Cells.UUID> implements SiUUID {}

export {SiUUID};
export default SiUUIDClass;
