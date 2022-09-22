import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import {SiString, SiStringClass, SiUUID, SiUUIDClass} from "../../types";
import Cell from "../../decorators/cell";
import SiURIClass, {SiURI} from "../../types/siURI";

namespace SiRemoteCell {
  export const CELL_TYPE = "remote-cell";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiRemoteCell extends SiCell<SiRemoteCell, void> {
  getRemoteCellType(): SiString;

  getRemoteCellURI(): SiURI;

  getRemoteCellUUID(): SiUUID;

  setRemoteCellType(remoteCellType: SiString): SiRemoteCell;

  setRemoteCellURI(remoteCellURI: SiURI): SiRemoteCell;

  setRemoteCellUUID(remoteCellUUID: SiUUID): SiRemoteCell;
}

@CellType(
  SiRemoteCell.CELL_TYPE,
  SiRemoteCell.CELL_UUID
)
class SiRemoteCellClass extends SiCellClass<SiRemoteCell, void> implements SiRemoteCell {

  @Cell(SiStringClass)
  private remoteCellType?: SiString;
  @Cell(SiURIClass)
  private remoteCellURI?: SiURI;
  @Cell(SiUUIDClass)
  private remoteCellUUID?: SiUUID;

  getRemoteCellType(): SiString {
    return this.remoteCellType as SiString;
  }

  getRemoteCellURI(): SiURI {
    return this.remoteCellURI as SiURI;
  }

  getRemoteCellUUID(): SiUUID {
    return this.remoteCellUUID as SiUUID;
  }

  restore(data: object | string): SiRemoteCell {
    let cellType = Reflect.get(data as object, SiCell.PROPERTY_CELL_TYPE);
    let cellURI = Reflect.get(data as object, SiCell.PROPERTY_CELL_URI);
    let cellUUID = Reflect.get(data as object, SiCell.PROPERTY_CELL_UUID);

    if (cellType === undefined || cellType === SiRemoteCell.CELL_TYPE) {
      return super.restore(data as object);
    }

    this.setRemoteCellType(this.createTransientCell(SiStringClass, cellType));
    this.setRemoteCellUUID(this.createTransientCell(SiUUIDClass, cellUUID));
    this.setRemoteCellURI(this.createTransientCell(SiURIClass, cellURI));

    return this.getSelf();
  }

  setRemoteCellType(remoteCellType: SiString): SiRemoteCell {
    return this.swapSubCell(this.remoteCellType, remoteCellType);
  }

  setRemoteCellURI(remoteCellURI: SiURI): SiRemoteCell {
    return this.swapSubCell(this.remoteCellURI, remoteCellURI);
  }

  setRemoteCellUUID(remoteCellUUID: SiUUID): SiRemoteCell {
    return this.swapSubCell(this.remoteCellUUID, remoteCellUUID);
  }
}

export {SiRemoteCell};
export default SiRemoteCellClass;
