import SiDiscoveryManagerClass, {SiDiscoveryManager} from "../siDiscoveryManager";
import SiCellClass from "../siCell";
import {DiscoveryModule} from "../module";

class Discovery {
  private discoveryManager: SiDiscoveryManager;
  private cells: any[] = [];

  constructor() {
    this.discoveryManager = new SiDiscoveryManagerClass();
  }

  register(discoveryModule: DiscoveryModule): void {
    if (discoveryModule.classes !== undefined)
      discoveryModule.classes.forEach((clazz) => {
      if (typeof clazz === "function" && new clazz() instanceof SiCellClass) {
        this.cells.push(clazz);
      }
    });
  }

  run(): void {
    this.discoveryManager.create(this.cells);
    // TODO: this.discoveryManager.restore("");
  }

  getDiscoveryManager(): SiDiscoveryManager {
    return this.discoveryManager;
  }
}

export default Discovery;
