import CellType from "../../decorators/cellType";
import SiRemoteCellClass, {SiRemoteCell} from "./siRemoteCell";
import Cell from "../../decorators/cell";
import {SiLong, SiLongClass, SiString, SiStringClass} from "../../types";
import SiCellClass, {SiCell} from "../../siCell";
import {SiDiscoveryManager} from "../../siDiscoveryManager";

namespace SiRemoteDiscovery {
  export const CELL_TYPE = "remote-discovery";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const PROPERTY_EXCHANGE_TIME = "exchangeTime";
  export const PROPERTY_REMOTE_DISCOVERY_URI = "remoteDiscoveryURI";
}

interface SiRemoteDiscovery extends SiCell<SiRemoteDiscovery, void> {
  getExchangeTime(): SiLong;

  getRemoteDiscoveryURI(): SiString;

  setRemoteDiscoveryURI(remoteDiscoveryURI: SiString): SiRemoteDiscovery;
}

@CellType(
  SiRemoteDiscovery.CELL_TYPE,
  SiRemoteDiscovery.CELL_UUID
)
class SiRemoteDiscoveryClass extends SiCellClass<SiRemoteDiscovery, void>
  implements SiRemoteDiscovery {

  @Cell(SiLongClass)
  private exchangeTime?: SiLong;
  @Cell(SiStringClass)
  private remoteDiscoveryURI?: SiString;

  getExchangeTime(): SiLong {
    return this.exchangeTime as SiLong;
  }

  getRemoteDiscoveryURI(): SiString {
    return this.remoteDiscoveryURI as SiString;
  }

  restore(data: object | string): SiRemoteDiscovery {
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (error) {
        this.log().debug(error);

        return this.getSelf();
      }
    }

    let cellType = Reflect.get(data as object, SiCell.PROPERTY_CELL_TYPE);
    let cellURI = Reflect.get(data as object, SiCell.PROPERTY_CELL_URI);
    let cellUUID = Reflect.get(data as object, SiCell.PROPERTY_CELL_UUID);
    let subCells = Reflect.get(data as object, SiCell.PROPERTY_SUB_CELLS);

    if (cellType === undefined) {
      return super.restore(data as object);
    }

    this.removeSubCells();

    if (cellType === SiDiscoveryManager.CELL_TYPE) {
      this.swapSubCell(SiRemoteDiscovery.PROPERTY_EXCHANGE_TIME,
        this.createTransientCell(SiLongClass, new Date().getTime()));
      this.swapSubCell(SiRemoteDiscovery.PROPERTY_REMOTE_DISCOVERY_URI,
        this.createTransientCell(SiStringClass, cellURI));
    } else if (cellType === SiRemoteDiscovery.CELL_TYPE) {
      if (Reflect.has(data as object, SiRemoteDiscovery.PROPERTY_EXCHANGE_TIME)) {
        this.swapSubCell(SiRemoteDiscovery.PROPERTY_EXCHANGE_TIME,
          this.createTransientCell(SiLongClass).restore(Reflect.get(data as object,
            SiRemoteDiscovery.PROPERTY_EXCHANGE_TIME)));
      }
      if (Reflect.has(data as object, SiRemoteDiscovery.PROPERTY_REMOTE_DISCOVERY_URI)) {
        this.swapSubCell(SiRemoteDiscovery.PROPERTY_REMOTE_DISCOVERY_URI,
          this.createTransientCell(SiStringClass).restore(Reflect.get(data as object,
            SiRemoteDiscovery.PROPERTY_REMOTE_DISCOVERY_URI)));
      }
    }

    if (subCells !== undefined) {
      for (let entry of subCells) {
        let subCellType = Reflect.get(entry, SiCell.PROPERTY_CELL_TYPE);

        if (subCellType === undefined || subCellType.length === 0) {
          this.log().debug("Cell type for sub cell is null or empty. Skipping entry.");
          continue;
        }

        let subCellName = Reflect.get(entry, SiCell.PROPERTY_CELL_NAME);

        if (subCellName === SiRemoteDiscovery.PROPERTY_EXCHANGE_TIME ||
          subCellName === SiRemoteDiscovery.PROPERTY_REMOTE_DISCOVERY_URI) {
          continue;
        }

        let remoteCell = this.createCell<SiRemoteCell>(SiRemoteCellClass, subCellName);
        remoteCell.restore(entry);
      }
    }

    return this.getSelf();
  }

  setRemoteDiscoveryURI(remoteDiscoveryURI: SiString): SiRemoteDiscovery {
    return this.swapSubCell(this.remoteDiscoveryURI, remoteDiscoveryURI);
  }
}

export {SiRemoteDiscovery};
export default SiRemoteDiscoveryClass;
