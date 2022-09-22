import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import SiCellRegistryEntryClass, {SiCellRegistryEntry} from "../siCellRegistryEntry";
import SiCellRegistryEntryClassClass from "../siCellRegistryEntryClass";
import SiCellRegistryEntryTypeClass from "../siCellRegistryEntryType";
import SiCellRegistryEntryUUIDClass from "../siCellRegistryEntryUUID";

namespace SkProcessClasses {
  export const CELL_TYPE = "cell-registry-process-classes-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkProcessClasses extends SiCell<SkProcessClasses, void> {
  setClasses(classes: any[]): SkProcessClasses;
}

@CellType(
  SkProcessClasses.CELL_TYPE,
  SkProcessClasses.CELL_UUID
)
class SkProcessClassesClass extends SiCellClass<SkProcessClasses, void> implements SkProcessClasses {

  private classes?: any[];

  run(): SkProcessClasses {
    // TODO: Assertion und throw Error mit cell

    this.classes?.forEach((clazz) => {
      let cellType = Reflect.getMetadata(CellType.META_CELL_TYPE, clazz);
      let cellUUID = Reflect.getMetadata(CellType.META_CELL_UUID, clazz);
      let component = Reflect.getMetadata(CellType.META_COMPONENT, clazz);

      if (component) {
        this.buildCell(clazz, cellType, this.root());
      }

      let entry = this.createCell<SiCellRegistryEntry>(SiCellRegistryEntryClass, cellType, this.getController());
      entry?.getSubCell(SiCellRegistryEntryTypeClass)?.setCellValue(cellType);
      entry?.getSubCell(SiCellRegistryEntryUUIDClass)?.setCellValue(cellUUID);
      entry?.getSubCell(SiCellRegistryEntryClassClass)?.setCellValue(clazz);

    });

    return this.getSelf();
  }

  setClasses(classes: any[]): SkProcessClasses {
    this.classes = classes;
    return this.getSelf();
  }
}

export {SkProcessClasses};
export default SkProcessClassesClass;
