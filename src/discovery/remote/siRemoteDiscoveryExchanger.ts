import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";

namespace SiRemoteDiscoveryExchanger {
  export const CELL_TYPE = "remote-discovery-exchanger";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiRemoteDiscoveryExchanger extends SiCell<SiRemoteDiscoveryExchanger, void> {
}

@CellType(
  SiRemoteDiscoveryExchanger.CELL_TYPE,
  SiRemoteDiscoveryExchanger.CELL_UUID
)
class SiRemoteDiscoveryExchangerClass extends SiCellClass<SiRemoteDiscoveryExchanger, void>
  implements SiRemoteDiscoveryExchanger {

  run(): SiRemoteDiscoveryExchanger {
    return super.run();
  }
}

export {SiRemoteDiscoveryExchanger};
export default SiRemoteDiscoveryExchangerClass;
