import SkCheckAndInjectClass, {SkCheckAndInject} from "./skills/skCheckAndInject";
import SkInjectCellsClass, {SkInjectCells} from "./skills/skInjectCells";
import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import SiBooleanClass, {SiBoolean} from "../../types/siBoolean";
import SkInjectCellReferencesClass, {SkInjectCellReferences} from "./skills/skInjectCellReferences";
import SkFinishClass, {SkFinish} from "./skills/skFinish";
import {SiRemoteDiscovery} from "../remote/siRemoteDiscovery";
import SkCheckAndInjectRemoteCellsClass, {
  SkCheckAndInjectRemoteCells
} from "./skills/skCheckAndInjectRemoteCells";
import SiStringClass, {SiString} from "../../types/siString";

namespace SiCellInjector {
  export const CELL_TYPE = "cell-injector";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const LOST_REFERENCE_HANDLING_REMOTE_DISCOVERY = "remote-discovery";
  export const LOST_REFERENCE_HANDLING_REMOTE_SELF_TCP = "remote-self-tcp";
  export const LOST_REFERENCE_HANDLING_REMOTE_SELF_WS = "remote-self-ws";
}

interface SiCellInjector extends SiCell<SiCellInjector, void> {
  checkAndInject(cell: SiCell<any, any>): void;

  checkAndInjectRemoteCells(remoteDiscovery: SiRemoteDiscovery): void;

  finish(): void;

  getLostReferenceHandling(): SiString;

  injectCellReferences(cell: SiCell<any, any>): void;

  injectCells(cell: SiCell<any, any>): void;

  isFinished(): SiBoolean;

  setLostReferenceHandling(lostReferenceHandling: SiString): SiCellInjector;
}

@CellType(
  SiCellInjector.CELL_TYPE,
  SiCellInjector.CELL_UUID
)
class SiCellInjectorClass extends SiCellClass<SiCellInjector, void> implements SiCellInjector {

  private finished?: SiBoolean;
  private lostReferenceHandling?: SiString;
  private skCheckAndInject?: SkCheckAndInject;
  private skCheckAndInjectRemoteCells?: SkCheckAndInjectRemoteCells;
  private skFinish?: SkFinish;
  private skInjectCellReferences?: SkInjectCellReferences;
  private skInjectCells?: SkInjectCells;

  checkAndInject(cell: SiCell<any, any>): void {
    try {
      this.skCheckAndInject?.createTransientInstance()
      .setCell(cell)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  checkAndInjectRemoteCells(remoteDiscovery: SiRemoteDiscovery): void {
    try {
      this.skCheckAndInjectRemoteCells?.createTransientInstance()
      .setRemoteDiscovery(remoteDiscovery)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  create(): SiCellInjector {
    this.skCheckAndInject = this.buildCell<SkCheckAndInject>(SkCheckAndInjectClass, "skCheckAndInject");
    this.skCheckAndInjectRemoteCells = this.buildCell<SkCheckAndInjectRemoteCells>(SkCheckAndInjectRemoteCellsClass, "skCheckAndInjectRemoteCells");
    this.skInjectCells = this.buildCell<SkInjectCells>(SkInjectCellsClass, "skInjectCells");
    this.skInjectCellReferences = this.buildCell<SkInjectCellReferences>(SkInjectCellReferencesClass, "skInjectCellReferences");
    this.skFinish = this.buildCell<SkFinish>(SkFinishClass, "skFinish");
    this.finished = this.buildCell<SiBoolean>(SiBooleanClass, "finished")?.setCellValue(false);
    this.lostReferenceHandling = this.buildCell<SiString>(SiStringClass, "lostReferenceHandling")?.setCellValue(SiCellInjector.LOST_REFERENCE_HANDLING_REMOTE_DISCOVERY);

    this.setCreated(true);

    return this.getSelf();
  }

  finish(): void {
    if (this.finished?.getCellValue()) {
      throw new Error("TODO: Exception Handling. Injector is finished");
    }

    this.finished?.setCellValue(true);

    try {
      this.skFinish?.createTransientInstance()
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  getLostReferenceHandling(): SiString {
    return this.lostReferenceHandling as SiString;
  }

  injectCellReferences(cell: SiCell<any, any>): void {
    try {
      this.skInjectCellReferences?.createTransientInstance()
      .setCell(cell)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  injectCells(cell: SiCell<any, any>): void {
    try {
      this.skInjectCells?.createTransientInstance()
      .setCell(cell)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      this.log().error("TODO: Exception Handling", error);
    }
  }

  isFinished(): SiBoolean {
    return this.finished as SiBoolean;
  }

  setLostReferenceHandling(lostReferenceHandling: SiString): SiCellInjector {
    this.removeSubCell(this.lostReferenceHandling!);
    this.addSubCell(lostReferenceHandling);
    this.lostReferenceHandling = lostReferenceHandling;

    return this.getSelf();
  }
}

export {SiCellInjector};
export default SiCellInjectorClass;
