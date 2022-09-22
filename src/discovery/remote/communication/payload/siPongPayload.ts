import {CellType} from "../../../../decorators";
import {SiString, SiStringClass} from "../../../../types";

namespace SiPongPayload {
  export const CELL_TYPE = "discovery-ping-communication-message-payload-pong";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const PONG = "pong";
}

interface SiPongPayload extends SiString {
}

@CellType(
  SiPongPayload.CELL_TYPE,
  SiPongPayload.CELL_UUID
)
class SiPongPayloadClass extends SiStringClass implements SiPongPayload {


  getCellValue(): string | undefined {
    return SiPongPayload.PONG;
  }
}

export {SiPongPayload};
export default SiPongPayloadClass;
