import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";
import {SiArray} from "../../types/siArray";
import {SiRemoteDiscovery} from "./siRemoteDiscovery";
import {SiString} from "../../types/siString";
import {SiCommunicationManager} from "../../communication/siCommunicationManager";
import Cells from "../../utils/cells";
import SiDiscoveryPingInterpreterClass, {
  SiDiscoveryPingInterpreter
} from "./communication/siDiscoveryPingInterpreter";
import Cell from "../../decorators/cell";
import SkCheckRemoteDiscoveryClass, {SkCheckRemoteDiscovery}
  from "./skills/skCheckRemoteDiscovery";
import SkGetRemoteDiscoveryClass, {SkGetRemoteDiscovery}
  from "./skills/skGetRemoteDiscovery";
import SkRegisterRemoteDiscoveryClass, {
  SkRegisterRemoteDiscovery
} from "./skills/skRegisterRemoteDiscovery";
import SkProcessRemoteDiscoveryClass, {
  SkProcessRemoteDiscovery
} from "./skills/skProcessRemoteDiscovery";
import SiDiscoveryExchangeInterpreterClass, {
  SiDiscoveryExchangeInterpreter
} from "./communication/siDiscoveryExchangeInterpreter";
import SiExecuteCellMethodInterpreterClass, {
  SiExecuteCellSkillInterpreter
} from "./communication/siExecuteCellSkillInterpreter";
import SiErrorInterpreterClass, {SiErrorInterpreter} from "./communication/siErrorInterpreter";

namespace SiRemoteDiscoveryManager {
  export const CELL_TYPE = "remote-discovery-manager";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiRemoteDiscoveryManager extends SiCell<SiRemoteDiscoveryManager, SiArray<SiRemoteDiscovery>> {
  getRemoteDiscovery(discoveryURI: SiString): SiRemoteDiscovery | undefined;

  processRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): void;

  registerRemoteDiscovery(discoveryURI: SiString): SiRemoteDiscovery | undefined;

  checkRemoteDiscovery(discoveryURI: SiString): SiRemoteDiscovery | undefined;

  updateRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): void;

  start(): void;
}

@CellType(
  SiRemoteDiscoveryManager.CELL_TYPE,
  SiRemoteDiscoveryManager.CELL_UUID
)
class SiRemoteDiscoveryManagerClass extends SiCellClass<SiRemoteDiscoveryManager, SiArray<SiRemoteDiscovery>>
  implements SiRemoteDiscoveryManager {

  @Cell(SiDiscoveryPingInterpreterClass)
  private discoveryPingInterpreter?: SiDiscoveryPingInterpreter;
  @Cell(SiDiscoveryExchangeInterpreterClass)
  private discoveryExchangeInterpreter?: SiDiscoveryExchangeInterpreter;
  @Cell(SiExecuteCellMethodInterpreterClass)
  private executeCellMethodInterpreter?: SiExecuteCellSkillInterpreter;
  @Cell(SiErrorInterpreterClass)
  private errorInterpreter?: SiErrorInterpreter;
  @Cell(SkCheckRemoteDiscoveryClass)
  private skCheckRemoteDiscovery?: SkCheckRemoteDiscovery;
  @Cell(SkGetRemoteDiscoveryClass)
  private skGetRemoteDiscovery?: SkGetRemoteDiscovery;
  @Cell(SkProcessRemoteDiscoveryClass)
  private skProcessRemoteDiscovery?: SkProcessRemoteDiscovery
  @Cell(SkRegisterRemoteDiscoveryClass)
  private skRegisterRemoteDiscovery?: SkRegisterRemoteDiscovery;

  afterCreate() {
    let communicationManager = this.rootSkill<SiCommunicationManager<any>>(
      Cells.Identifier.type(SiCommunicationManager.CELL_TYPE));

    communicationManager?.registerInterpreter(this.discoveryPingInterpreter!);
    communicationManager?.registerInterpreter(this.discoveryExchangeInterpreter!);
    communicationManager?.registerInterpreter(this.executeCellMethodInterpreter!);
    communicationManager?.registerInterpreter(this.errorInterpreter!);
  }

  getRemoteDiscovery(discoveryURI: SiString): SiRemoteDiscovery | undefined {
    try {
      return this.skGetRemoteDiscovery?.createTransientInstance()
      .setDiscoveryURI(discoveryURI)
      .returnAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }

    return undefined;
  }

  processRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): void {
    try {
      this.skProcessRemoteDiscovery?.createTransientInstance()
      .setRemoteDiscovery(remoteDiscovery)
      .returnAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  registerRemoteDiscovery(discoveryURI: SiString): SiRemoteDiscovery | undefined{
    try {
      return this.skRegisterRemoteDiscovery?.createTransientInstance()
      .setDiscoveryURI(discoveryURI)
      .returnAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }

    return undefined;
  }

  start(): void {
  }

  checkRemoteDiscovery(discoveryURI: SiString): SiRemoteDiscovery | undefined {
    try {
      return this.skCheckRemoteDiscovery?.createTransientInstance()
      .setDiscoveryURI(discoveryURI)
      .returnAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }

    return undefined;
  }

  updateRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): void {
  }
}

export {SiRemoteDiscoveryManager};
export default SiRemoteDiscoveryManagerClass;
