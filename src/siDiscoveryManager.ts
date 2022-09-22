import Cell from "./decorators/cell";
import SiCellInjectorClass, {SiCellInjector} from "./discovery/injection/siCellInjector";
import SiCell from "./siCell";
import SiCellClass from "./siCell";
import SiBooleanClass, {SiBoolean} from "./types/siBoolean";
import SiStringClass, {SiString} from "./types/siString";
import SiCellRegistry from "./discovery/registry/siCellRegistry";
import SiCellRegistryClass from "./discovery/registry/siCellRegistry";
import {SiEventBus} from "./messaging/eventbus/siEventBus";
import Cells from "./utils/cells";
import SiCellAnalyzerRegistryClass, {
  SiCellAnalyzerRegistry
} from "./discovery/analyzer/siCellAnalyzerRegistry";
import SiDiscoveryInitializedClass, {
  SiDiscoveryInitialized
} from "./discovery/messages/siDiscoveryInitialized";
import SiEnvironmentClass, {SiEnvironment} from "./discovery/environment/siEnvironment";
import SiRemoteDiscoveryManagerClass, {
  SiRemoteDiscoveryManager
} from "./discovery/remote/siRemoteDiscoveryManager";
import {SiCommunicationManager} from "./communication/siCommunicationManager";
import SiConsoleBannerClass, {SiConsoleBanner} from "./discovery/banner/siConsoleBanner";
import SiDiscoveryRestoredClass, {
  SiDiscoveryRestored
} from "./discovery/messages/siDiscoveryRestored";
import SiLogManagerClass, {SiLogManager} from "./logging/siLogManger";
import {SiLogger} from "./logging/siLogger";

interface SiDiscoveryManager extends SiCell<SiDiscoveryManager, Object> {
  analyzeCell(cell: SiCell<any, any>): void;

  create(cellClasses: any[]): SiDiscoveryManager;

  create(): SiDiscoveryManager;

  findCellClass(cellIdentifier: Cells.Identifier): (() => SiCellClass<any, any>) | undefined;

  getDiscoveryName(): SiString;

  getEnvironment(): SiEnvironment;

  getLogger(cell: SiCell<any, any>): SiLogger;

  injectCells(cell: SiCell<any, any>): void;

  isInitialized(): SiBoolean;

  isRestored(): SiBoolean;
}

namespace SiDiscoveryManager {
  export const CELL_TYPE = "discovery-manager";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

class SiDiscoveryManagerClass extends SiCellClass<SiDiscoveryManager, Object> implements SiDiscoveryManager {
  protected cellAnalyzerRegistry?: SiCellAnalyzerRegistry;
  protected cellInjector?: SiCellInjector;
  protected cellRegistry?: SiCellRegistry;
  @Cell(Cells.Identifier.type(SiCommunicationManager.CELL_TYPE))
  protected communicationManager?: SiCommunicationManager<any>;
  @Cell(SiConsoleBannerClass)
  protected consoleBanner?: SiConsoleBanner;
  @Cell(SiDiscoveryInitializedClass)
  protected discoveryInitialized?: SiDiscoveryInitialized;
  @Cell(SiStringClass, Cell.Option.value("Inion Discovery"))
  protected discoveryName?: SiString;
  @Cell(SiDiscoveryRestoredClass)
  protected discoveryRestored?: SiDiscoveryRestored;
  protected environment?: SiEnvironment;
  @Cell(Cells.Identifier.type(SiEventBus.CELL_TYPE))
  protected eventBus?: SiEventBus<any>;
  protected initialized?: SiBoolean;
  protected logManager?: SiLogManager;
  @Cell(SiRemoteDiscoveryManagerClass)
  protected remoteDiscoveryManager?: SiRemoteDiscoveryManager;
  protected restored?: SiBoolean;

  afterCreate() {
    this.getSubCells().forEach((subCell) => {
      if (!subCell.isCreated()) {
        subCell.create();
      }
    });

    this.cellInjector?.finish();
    this.cellAnalyzerRegistry?.finish();

    let cellURI = "discovery://"
      + this.environment?.getExternalHost().getCellValue()
      + ":"
      + this.environment?.getPort().getCellValue();

    this.setCellURI(cellURI);
    this.getSubCells().forEach((subCell) => subCell.buildCellURI());

    if (this.communicationManager !== undefined) {
      this.log().info("Start Discovery Communication");

      this.environment?.getHosts().getCellValue()?.forEach(host => {
        this.communicationManager!.listenTCP(host, this.environment!.getPort());
      });
      //
      // TODO: this.communicationManager.listenWebSocket(this.environment!.getHost(), this.environment!.getPort());
    }

    if (this.remoteDiscoveryManager !== undefined) {
      this.remoteDiscoveryManager.start();
    }

    if (this.eventBus !== undefined) {
      this.eventBus.publish(this.discoveryInitialized!);
    }

    console.log(this.consoleBanner?.getCellValue());
    console.log("Name: " + this.getDiscoveryName().getCellValue() + ", URI: " + this.getCellURI());

    this.environment?.getHosts().getCellValue()?.forEach(host => {
      console.log("Com: " + host.getCellValue() + ":" + this.environment!.getPort().getCellValue());
    });
  }

  analyzeCell(cell: SiCellClass<any, any>): void {
    this.cellAnalyzerRegistry?.process(cell);
  }

  create(cellClasses?: any[]): SiDiscoveryManager {
    this.setRootCell(this);
    this.setCellName("discovery-manager");
    this.setCellURI("localhost");
    this.setCellType(SiDiscoveryManager.CELL_TYPE);

    this.logManager = this.createCell<SiLogManager>(SiLogManagerClass, "logManager");
    this.log().info("Start Discovery Initialization");

    this.initialized = this.buildCell<SiBoolean>(SiBooleanClass, "initialized");
    this.restored = this.buildCell<SiBoolean>(SiBooleanClass, "restored");
    this.cellInjector = this.createCell<SiCellInjector>(SiCellInjectorClass, "cellInjector");
    this.cellAnalyzerRegistry = this.createCell<SiCellAnalyzerRegistry>(SiCellAnalyzerRegistryClass, "cellAnalyzerRegistry");
    this.cellRegistry = this.createCell<SiCellRegistry>(SiCellRegistryClass, "cellRegistry");
    this.environment = this.createCell<SiEnvironment>(SiEnvironmentClass, "environment");

    this.cellRegistry?.processClasses(cellClasses as any[]);
    this.cellAnalyzerRegistry?.registerCells();

    return super.create();
  }

  findCellClass(cellIdentifier: Cells.Identifier): (() => SiCellClass<any, any>) | undefined {
    return this.cellRegistry?.findCellClass(cellIdentifier);
  }

  getDiscoveryName(): SiString {
    return this.discoveryName as SiString;
  }

  getEnvironment(): SiEnvironment {
    return this.environment as SiEnvironment;
  }

  getLogger(cell: SiCellClass<any, any>): SiLogger {
    return this.logManager?.getLogger(cell) as SiLogger;
  }

  injectCells(cell: SiCellClass<any, any>): void {
    this.cellInjector?.checkAndInject(cell);
  }

  isInitialized(): SiBoolean {
    return this.initialized as SiBoolean;
  }

  isRestored(): SiBoolean {
    return this.restored as SiBoolean;
  }

  isRoot(): boolean {
    return true;
  }

  log(): SiLogger {
    return this.getLogger(this);
  }
}

export {SiDiscoveryManager};
export default SiDiscoveryManagerClass;
