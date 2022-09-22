import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import SiStringClass, {SiString} from "../../../types/siString";
import Cell from "../../../decorators/cell";
import SiRemoteDiscoveryClass, {SiRemoteDiscovery} from "../siRemoteDiscovery";
import {SiRemoteDiscoveryManager} from "../siRemoteDiscoveryManager";

namespace SkGetRemoteDiscovery {
  export const CELL_TYPE = "remote-discovery-manager-get-remote-discovery-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkGetRemoteDiscovery extends SiCell<SkGetRemoteDiscovery, SiRemoteDiscovery> {
  setDiscoveryURI(discoveryURI: SiString): SkGetRemoteDiscovery
}

@CellType(
  SkGetRemoteDiscovery.CELL_TYPE,
  SkGetRemoteDiscovery.CELL_UUID
)
class SkGetRemoteDiscoveryClass extends SiCellClass<SkGetRemoteDiscovery, SiRemoteDiscovery> implements SkGetRemoteDiscovery {

  @Cell(SiStringClass)
  private discoveryURI?: SiString;

  run(): SkGetRemoteDiscovery {
    // TODO Assertions -> disoveryURI & value
    let remoteDiscoveryManager = <SiRemoteDiscoveryManager>this.getController();

    for (let subCell of remoteDiscoveryManager.getSubCells(SiRemoteDiscoveryClass)) {
      if (subCell.getRemoteDiscoveryURI().getCellValue() === this.discoveryURI?.getCellValue()) {
        this.setCellValue(subCell);
        break;
      }
    }

    return this.getSelf();
  }

  setDiscoveryURI(discoveryURI: SiString): SkGetRemoteDiscovery {
    return this.swapSubCell(this.discoveryURI, discoveryURI);
  }
}

export {SkGetRemoteDiscovery};
export default SkGetRemoteDiscoveryClass;
