import CellType from "../decorators/cellType";
import SiObjectClass, {SiObject} from "./siObject";

namespace SiJsonObject {
  export const CELL_TYPE = "json-object";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiJsonObject extends SiObject {}

@CellType(
  SiJsonObject.CELL_TYPE,
  SiJsonObject.CELL_UUID
)
class SiJsonObjectClass extends SiObjectClass implements SiJsonObject {}

export {SiJsonObject};
export default SiJsonObjectClass;
