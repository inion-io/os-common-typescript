import {SiCell} from "../../../siCell";
import CellType from "../../../decorators/cellType";
import Cells from "../../../utils/cells";
import CellReference from "../../../decorators/cellReference";
import {SiCellInjector} from "../siCellInjector";
import SiCellInjectorLazyCellReferenceClass, {
  SiCellInjectorLazyCellReference
} from "../siCellInjectorLazyCellReference";
import SiCellInjectorLostCellReferenceClass, {
  SiCellInjectorLostCellReference
} from "../siCellInjectorLostCellReference";
import SiCellReferenceClass, {SiCellReference} from "../../../siCellReference";
import {SiCellClass} from "../../../index";
import SiRemoteCellReferenceClass, {
  SiRemoteCellReference
} from "../../remote/siRemoteCellReference";
import SiStringClass, {SiString} from "../../../types/siString";
import SiArrayClass, {SiArray} from "../../../types/siArray";

namespace SkInjectCellReferences {
  export const CELL_TYPE = "cell-injector-inject-cell-references-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkInjectCellReferences extends SiCell<SkInjectCellReferences, void> {
  setCell(cell: SiCell<any, any>): SkInjectCellReferences;
}

@CellType(
  SkInjectCellReferences.CELL_TYPE,
  SkInjectCellReferences.CELL_UUID
)
class SkInjectCellReferencesClass extends SiCellClass<SkInjectCellReferences, void> implements SkInjectCellReferences {

  private cell?: SiCell<any, any>;

  run(): SkInjectCellReferences {
    // TODO: Assertion und throw Error mit cell

    CellReference.Helper.getProperties(this.cell as SiCell<any, any>).forEach((property) => {
      if (!(<SiCellInjector>this.getController()).isFinished().getCellValue()) {
        this.getController().createCell<SiCellInjectorLazyCellReference>(SiCellInjectorLazyCellReferenceClass)
        ?.setCellValue(this.cell as SiCell<any, any>);

        return;
      }

      let cellUUID = property.cellUUID;
      let cellType = property.cellType;
      let cellClass = property.cellClass;

      let injectCell: SiCell<any, any> | SiRemoteCellReference | undefined;

      if (cellType !== undefined && cellType.length > 0) {
        injectCell = this.root().getSubCell(Cells.Identifier.type(cellType));
      } else if (cellClass !== undefined) {
        injectCell = this.root().getSubCell(cellClass);
      }

      if (injectCell !== undefined) {
        let cellReference = this.cell!.createCell<SiCellReference>(SiCellReferenceClass)!.setCellValue(injectCell);
        Reflect.set(this.cell as Object, property.propertyKey, injectCell);
        cellReference.setControllerPropertyKey(property.propertyKey);
      } else if ((<SiCellInjector>this.getController()).isFinished().getCellValue()) {
        let lostReferenceHandling = (<SiCellInjector>this.getController()).getLostReferenceHandling().getCellValue();

        if (lostReferenceHandling === SiCellInjector.LOST_REFERENCE_HANDLING_REMOTE_DISCOVERY) {
          this.getController().createCell<SiCellInjectorLostCellReference>(SiCellInjectorLostCellReferenceClass)
          ?.setCellValue(this.cell as SiCell<any, any>);
        } else if (lostReferenceHandling === SiCellInjector.LOST_REFERENCE_HANDLING_REMOTE_SELF_TCP ||
          lostReferenceHandling === SiCellInjector.LOST_REFERENCE_HANDLING_REMOTE_SELF_WS) {
          injectCell = this.cell?.createCell<SiRemoteCellReference>(SiRemoteCellReferenceClass, property.propertyKey);

          Reflect.set(this.cell as object, property.propertyKey, new Proxy(injectCell!, {
            get(target, name) {
              return function () {
                let methodName = (<SiRemoteCellReference>target).createTransientCell<SiString>(SiStringClass, name.toString());
                let args = (<SiRemoteCellReference>target).createTransientCell<SiArray<any>>(SiArrayClass, Array.from(arguments));
                return (<SiRemoteCellReference>target).executeMethod(methodName, args);
              }
            }
          }));
        } else if (lostReferenceHandling === SiCellInjector.LOST_REFERENCE_HANDLING_REMOTE_SELF_WS) {

        }
      }
    });

    return this.getSelf();
  }

  setCell(cell: SiCell<any, any>): SkInjectCellReferences {
    this.cell = cell;
    return this.getSelf();
  }
}

export {SkInjectCellReferences};
export default SkInjectCellReferencesClass;
