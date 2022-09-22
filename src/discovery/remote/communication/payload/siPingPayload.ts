import {CellType} from "../../../../decorators";
import {SiString, SiStringClass} from "../../../../types";

namespace SiPingPayload {
  export const CELL_TYPE = "discovery-ping-communication-message-payload-ping";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const PING = "ping";
}

interface SiPingPayload extends SiString {}

@CellType(
  SiPingPayload.CELL_TYPE,
  SiPingPayload.CELL_UUID
)
class SiPingPayloadClass extends SiStringClass implements SiPingPayload {
  getCellValue(): string | undefined {
    return SiPingPayload.PING;
  }
}

export {SiPingPayload};
export default SiPingPayloadClass;
