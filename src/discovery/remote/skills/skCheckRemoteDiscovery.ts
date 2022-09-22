import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import SiStringClass, {SiString} from "../../../types/siString";
import Cell from "../../../decorators/cell";
import {SiRemoteDiscoveryManager} from "../siRemoteDiscoveryManager";
import {SiRemoteDiscovery} from "../siRemoteDiscovery";

namespace SkCheckRemoteDiscovery {
  export const CELL_TYPE = "remote-discovery-manager-check-remote-discovery-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkCheckRemoteDiscovery extends SiCell<SkCheckRemoteDiscovery, SiRemoteDiscovery> {
  setDiscoveryURI(discoveryURI: SiString): SkCheckRemoteDiscovery
}

@CellType(
  SkCheckRemoteDiscovery.CELL_TYPE,
  SkCheckRemoteDiscovery.CELL_UUID
)
class SkCheckRemoteDiscoveryClass extends SiCellClass<SkCheckRemoteDiscovery, SiRemoteDiscovery> implements SkCheckRemoteDiscovery {

  @Cell(SiStringClass)
  private discoveryURI?: SiString;

  run(): SkCheckRemoteDiscovery {
    // TODO: Assertions auf discoveryURI

    let remoteDiscoveryManager = <SiRemoteDiscoveryManager>this.getController();
    let remoteDiscovery = remoteDiscoveryManager.getRemoteDiscovery(this.discoveryURI!);

    if (remoteDiscovery !== undefined) {
      this.setCellValue(remoteDiscovery);
    } else {
      this.setCellValue(remoteDiscoveryManager.registerRemoteDiscovery(this.discoveryURI!) as SiRemoteDiscovery);
    }

    return this.getSelf();
  }

  setDiscoveryURI(discoveryURI: SiString): SkCheckRemoteDiscovery {
    return this.swapSubCell(this.discoveryURI, discoveryURI);
  }
}

export {SkCheckRemoteDiscovery};
export default SkCheckRemoteDiscoveryClass;
