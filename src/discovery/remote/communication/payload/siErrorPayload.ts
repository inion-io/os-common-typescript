import {CellType} from "../../../../decorators";
import {SiCell} from "../../../../siCell";
import {SiCellClass} from "../../../../index";

namespace SiErrorPayload {
  export const CELL_TYPE = "error-communication-message-payload";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiErrorPayload extends SiCell<SiErrorPayload, string> {
}

@CellType(
  SiErrorPayload.CELL_TYPE,
  SiErrorPayload.CELL_UUID
)
class SiErrorPayloadClass extends SiCellClass<SiErrorPayload, string> implements SiErrorPayload {
}

export {SiErrorPayload};
export default SiErrorPayloadClass;
