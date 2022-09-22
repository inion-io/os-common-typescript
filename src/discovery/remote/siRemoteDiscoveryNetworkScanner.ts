import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";

namespace SiRemoteDiscoveryNetworkScanner {
  export const CELL_TYPE = "remote-discovery-network-scanner";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiRemoteDiscoveryNetworkScanner extends SiCell<SiRemoteDiscoveryNetworkScanner, void> {}

@CellType(
  SiRemoteDiscoveryNetworkScanner.CELL_TYPE,
  SiRemoteDiscoveryNetworkScanner.CELL_UUID
)
class SiRemoteDiscoveryNetworkScannerClass extends SiCellClass<SiRemoteDiscoveryNetworkScanner, void> implements SiRemoteDiscoveryNetworkScanner {
  run(): SiRemoteDiscoveryNetworkScanner {
    return super.run();
  }
}

export {SiRemoteDiscoveryNetworkScanner};
export default SiRemoteDiscoveryNetworkScannerClass;
