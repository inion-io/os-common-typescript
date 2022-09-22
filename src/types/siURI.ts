import CellType from "../decorators/cellType";
import SiCellClass, {SiCell} from "../siCell";
import Cells from "../utils/cells";

namespace SiURI {
  export const CELL_TYPE = "uri";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiURI extends SiCell<SiURI, Cells.URI> {
}

@CellType(
  SiURI.CELL_TYPE,
  SiURI.CELL_UUID
)
class SiURIClass extends SiCellClass<SiURI, Cells.URI> implements SiURI {

  getCellValueAsString(): string {
    return this.hasCellValue() ? this.getCellValue()!.toString() : "";
  }

  setCellValueAsObject(value: any): SiURI {
    if (typeof value === "string") {
      return this.setCellValueAsString(value);
    }
    return super.setCellValueAsObject(value);
  }

  setCellValueAsString(value: string): SiURI {
    this.setCellValue(new Cells.URI(value));
    return this.getSelf();
  }
}

export {SiURI};
export default SiURIClass;
