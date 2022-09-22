import CellType from "../decorators/cellType";
import SiIntegerClass, {SiInteger} from "./siInteger";

namespace SiLong {
  export const CELL_TYPE = "long";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiLong extends SiInteger {
}

@CellType(
  SiLong.CELL_TYPE,
  SiLong.CELL_UUID
)
class SiLongClass extends SiIntegerClass implements SiLong {
}

export {SiLong};
export default SiLongClass;
