import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import SiStringClass, {SiString} from "../../../types/siString";
import Cell from "../../../decorators/cell";
import {SiRemoteDiscoveryManager} from "../siRemoteDiscoveryManager";
import SiRemoteDiscoveryClass, {SiRemoteDiscovery} from "../siRemoteDiscovery";

namespace SkRegisterRemoteDiscovery {
  export const CELL_TYPE = "remote-discovery-manager-register-remote-discovery-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkRegisterRemoteDiscovery extends SiCell<SkRegisterRemoteDiscovery, SiRemoteDiscovery> {
  setDiscoveryURI(discoveryURI: SiString): SkRegisterRemoteDiscovery
}

@CellType(
  SkRegisterRemoteDiscovery.CELL_TYPE,
  SkRegisterRemoteDiscovery.CELL_UUID
)
class SkRegisterRemoteDiscoveryClass extends SiCellClass<SkRegisterRemoteDiscovery, SiRemoteDiscovery> implements SkRegisterRemoteDiscovery {

  @Cell(SiStringClass)
  private discoveryURI?: SiString;

  run(): SkRegisterRemoteDiscovery {
    // TODO: Assertions -> discoveryURI und Value

    let remoteDiscoveryManager = <SiRemoteDiscoveryManager>this.getController();
    let remoteDiscovery = remoteDiscoveryManager.getRemoteDiscovery(this.discoveryURI!);

    if (remoteDiscovery === undefined) {
      remoteDiscovery = remoteDiscoveryManager.createCell(SiRemoteDiscoveryClass);
      remoteDiscovery?.setRemoteDiscoveryURI(this.discoveryURI!.createTransientInstance());
    }

    this.setCellValue(remoteDiscovery!);

    return this.getSelf();
  }

  setDiscoveryURI(discoveryURI: SiString): SkRegisterRemoteDiscovery {
    return this.swapSubCell(this.discoveryURI, discoveryURI);
  }
}

export {SkRegisterRemoteDiscovery};
export default SkRegisterRemoteDiscoveryClass;
