import CellType from "../../decorators/cellType";
import SiEventMessageClass, {SiEventMessage} from "../../messaging/siEventMessage";
import SiStringClass, {SiString} from "../../types/siString";
import Cell from "../../decorators/cell";

namespace SiDiscoveryRestored {
  export const CELL_TYPE = "event-message-discovery-restored";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const EVENT_NAME = "discovery-restored";
}

interface SiDiscoveryRestored extends SiEventMessage<SiDiscoveryRestored> {}

@CellType(
  SiDiscoveryRestored.CELL_TYPE,
  SiDiscoveryRestored.CELL_UUID
)
class SiDiscoveryRestoredClass extends SiEventMessageClass<SiDiscoveryRestored> implements SiDiscoveryRestored {
  @Cell(SiStringClass, Cell.Option.value(SiDiscoveryRestored.EVENT_NAME))
  protected eventName?: SiString;
}

export { SiDiscoveryRestored };
export default SiDiscoveryRestoredClass;
