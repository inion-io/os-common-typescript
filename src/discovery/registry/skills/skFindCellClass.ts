import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import SiCellRegistryEntryClass from "../siCellRegistryEntry";
import SiCellRegistryEntryClassClass from "../siCellRegistryEntryClass";
import SiCellRegistryEntryTypeClass from "../siCellRegistryEntryType";
import SiCellRegistryEntryUUIDClass from "../siCellRegistryEntryUUID";
import Cells from "../../../utils/cells";

namespace SkFindCellClass {
  export const CELL_TYPE = "cell-registry-find-cell-class-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkFindCellClass extends SiCell<SkFindCellClass, (() => SiCellClass<any, any>) | undefined> {
  setCellIdentifier(cellIdentifier: Cells.Identifier): SkFindCellClass;
}

@CellType(
  SkFindCellClass.CELL_TYPE,
  SkFindCellClass.CELL_UUID
)
class SkFindCellClassClass extends SiCellClass<SkFindCellClass, (() => SiCellClass<any, any>) | undefined> implements SkFindCellClass {

  private cellIdentifier?: Cells.Identifier;

  run(): SkFindCellClass {
    // TODO: Assertion und throw Error mit cell

    for (let entry of this.getController().getSubCells(SiCellRegistryEntryClass)) {
      let cellType = entry.getSubCell(SiCellRegistryEntryTypeClass)?.getCellValue();
      let cellUUID = entry.getSubCell(SiCellRegistryEntryUUIDClass)?.getCellValue();
      let cellClass = entry.getSubCell(SiCellRegistryEntryClassClass)?.getCellValue();

      if ((this.cellIdentifier?.isType() && cellType === this.cellIdentifier?.getValue()) ||
        (this.cellIdentifier?.isUUID() && cellUUID === this.cellIdentifier?.getValue())) {
        this.setCellValue(cellClass);
        break;
      }
    }

    return this.getSelf();
  }

  setCellIdentifier(cellIdentifier: Cells.Identifier): SkFindCellClass {
    this.cellIdentifier = cellIdentifier;
    return this.getSelf();
  }
}

export {SkFindCellClass};
export default SkFindCellClassClass;
