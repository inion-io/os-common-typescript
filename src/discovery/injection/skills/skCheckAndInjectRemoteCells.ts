import SiCellClass, {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import {SiRemoteDiscovery} from "../../remote/siRemoteDiscovery";
import SiCellInjectorLostCellReferenceClass from "../siCellInjectorLostCellReference";
import CellReference from "../../../decorators/cellReference";
import SiRemoteCellClass from "../../remote/siRemoteCell";
import SiRemoteCellReferenceClass, {
  SiRemoteCellReference
} from "../../remote/siRemoteCellReference";
import SiStringClass, {SiString} from "../../../types/siString";
import SiArrayClass, {SiArray} from "../../../types/siArray";

namespace SkCheckAndInjectRemoteCells {
  export const CELL_TYPE = "cell-injector-check-and-inject-remote-module-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkCheckAndInjectRemoteCells extends SiCell<SkCheckAndInjectRemoteCells, void> {
  setRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): SkCheckAndInjectRemoteCells;
}

@CellType(
  SkCheckAndInjectRemoteCells.CELL_TYPE,
  SkCheckAndInjectRemoteCells.CELL_UUID
)
class SkCheckAndInjectRemoteCellsClass extends SiCellClass<SkCheckAndInjectRemoteCells, void>
  implements SkCheckAndInjectRemoteCells {

  private remoteDiscovery?: SiRemoteDiscovery;

  run(): SkCheckAndInjectRemoteCells {
    // TODO Assertion für remoteDiscovery

    this.getController().getSubCells(SiCellInjectorLostCellReferenceClass).forEach((subCell) => {
      let cell: SiCell<any, any> = <SiCell<any, any>>subCell.getCellValue();

      if (cell === undefined) {
        return
      }

      CellReference.Helper.getProperties(cell).forEach((property) => {
        if (Reflect.get(cell as object, property.propertyKey) !== undefined) {
          return;
        }

        let cellUUID = property.cellUUID;
        let cellType = property.cellType;

        this.remoteDiscovery?.getSubCells(SiRemoteCellClass).forEach((remoteCell) => {
          if ((cellType !== undefined && cellType.length > 0 && remoteCell.getRemoteCellType().getCellValue() === cellType)) {
            // TODO: || (cellUUID !== undefined && cellUUID.length > 0 && remoteCell.getCellUUID() === cellUUID))

            let injectCell = cell.createCell<SiRemoteCellReference>(SiRemoteCellReferenceClass, property.propertyKey);
            injectCell?.setRemoteCellURI(this.createTransientCell(SiStringClass, remoteCell.getRemoteCellURI().getCellValueAsString()));
            injectCell?.setRemoteCellType(this.createTransientCell(SiStringClass, remoteCell.getRemoteCellType().getCellValue()));
            injectCell?.setRemoteCellName(this.createTransientCell(SiStringClass, remoteCell.getCellName())!);

            Reflect.set(cell as object, property.propertyKey, new Proxy(injectCell!, {
              get(target, name) {
                return function () {
                  let methodName = (<SiRemoteCellReference>target).createTransientCell<SiString>(SiStringClass, name.toString());
                  let args = (<SiRemoteCellReference>target).createTransientCell<SiArray<any>>(SiArrayClass, Array.from(arguments));

                  return (<SiRemoteCellReference>target).executeMethod(methodName, args);
                }
              }
            }));
          }
        });
      })
    });

    return this.getSelf();
  }

  setRemoteDiscovery(remoteDiscovery: SiRemoteDiscovery): SkCheckAndInjectRemoteCells {
    this.remoteDiscovery = remoteDiscovery;
    return this.getSelf();
  }
}

export {SkCheckAndInjectRemoteCells};
export default SkCheckAndInjectRemoteCellsClass;
