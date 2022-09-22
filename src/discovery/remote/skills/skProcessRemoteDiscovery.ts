import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import Cell from "../../../decorators/cell";
import {SiRemoteDiscoveryManager} from "../siRemoteDiscoveryManager";
import {SiCellInjector} from "../../injection/siCellInjector";
import Cells from "../../../utils/cells";
import SiRemoteDiscoveryClass, {SiRemoteDiscovery} from "../siRemoteDiscovery";

namespace SkProcessRemoteDiscovery {
  export const CELL_TYPE = "remote-discovery-manager-process-remote-discovery-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkProcessRemoteDiscovery extends SiCell<SkProcessRemoteDiscovery, void> {
  setRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): SkProcessRemoteDiscovery;
}

@CellType(
  SkProcessRemoteDiscovery.CELL_TYPE,
  SkProcessRemoteDiscovery.CELL_UUID
)
class SkProcessRemoteDiscoveryClass extends SiCellClass<SkProcessRemoteDiscovery, void> implements SkProcessRemoteDiscovery {

  @Cell(SiRemoteDiscoveryClass)
  private remoteDiscovery?: SiRemoteDiscovery;

  run(): SkProcessRemoteDiscovery {
    // TODO Assertions auf remoteDiscovery

    let remoteDiscoveryManger = <SiRemoteDiscoveryManager>this.getController();
    let cellInjector = this.rootSkill<SiCellInjector>(Cells.Identifier.type(SiCellInjector.CELL_TYPE));
    let curRemoteDiscovery = remoteDiscoveryManger?.getRemoteDiscovery(this.remoteDiscovery?.getRemoteDiscoveryURI()!);

    // TODO: Nur eine Prüfung auf die exchangeTime, damit keine doppelten Exchanges nach Reboot
    // einer anderen Discovery gemacht werden. Hier müssen konkrete Abgleichmechanismen
    // implementiert werden. Jeder Exchange, egal wann und wie oft, muss einen sauberen
    // Aktualisierungsprozess durchziehen

    if (curRemoteDiscovery === undefined || (curRemoteDiscovery.getExchangeTime() === undefined ||
      curRemoteDiscovery.getExchangeTime().getCellValue() === undefined)) {

      if (curRemoteDiscovery === undefined) {
        curRemoteDiscovery = remoteDiscoveryManger.registerRemoteDiscovery(
          this.remoteDiscovery?.getRemoteDiscoveryURI()!)
      }

      curRemoteDiscovery?.restore(this.remoteDiscovery!.toJsonObject());
      cellInjector?.checkAndInjectRemoteCells(curRemoteDiscovery!);
    }

    return this.getSelf();
  }

  setRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): SkProcessRemoteDiscovery {
    return this.swapSubCell(this.remoteDiscovery, remoteDiscovery);
  }
}

export {SkProcessRemoteDiscovery};
export default SkProcessRemoteDiscoveryClass;
