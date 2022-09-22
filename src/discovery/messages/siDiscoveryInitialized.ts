import CellType from "../../decorators/cellType";
import SiEventMessageClass, {SiEventMessage} from "../../messaging/siEventMessage";
import SiStringClass, {SiString} from "../../types/siString";
import Cell from "../../decorators/cell";

namespace SiDiscoveryInitialized {
  export const CELL_TYPE = "event-message-discovery-initialized";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const EVENT_NAME = "discovery-initialized";
}

interface SiDiscoveryInitialized extends SiEventMessage<SiDiscoveryInitialized> {}

@CellType(
  SiDiscoveryInitialized.CELL_TYPE,
  SiDiscoveryInitialized.CELL_UUID
)
class SiDiscoveryInitializedClass extends SiEventMessageClass<SiDiscoveryInitialized> implements SiDiscoveryInitialized {
  @Cell(SiStringClass, Cell.Option.value(SiDiscoveryInitialized.EVENT_NAME))
  protected eventName?: SiString;

}

export { SiDiscoveryInitialized };
export default SiDiscoveryInitializedClass;
