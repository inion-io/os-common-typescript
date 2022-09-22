import CellType from "../../decorators/cellType";
import SiCellClass, {SiCell} from "../../siCell";

namespace SiCellRegistryEntryClass {
  export const CELL_TYPE = "cell-registry-entry-class";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCellRegistryEntryClass extends SiCell<SiCellRegistryEntryClass, () => SiCellClass<any, any>> {
}

@CellType(
  SiCellRegistryEntryClass.CELL_TYPE,
  SiCellRegistryEntryClass.CELL_UUID
)
class SiCellRegistryEntryClassClass extends SiCellClass<SiCellRegistryEntryClass, () => SiCellClass<any, any>> implements SiCellRegistryEntryClass {
  getValueAsString(): string {
    return this.hasCellValue() ? this.getCellValue()!.constructor.toString() : "undefined";
  }
}

export {SiCellRegistryEntryClass};
export default SiCellRegistryEntryClassClass;

