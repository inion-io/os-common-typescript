import "reflect-metadata";
import {SiDiscoveryManager} from "./siDiscoveryManager";
import Cells from "./utils/cells";
import CellType from "./decorators/cellType";
import {SiLogger} from "./logging/siLogger";
import {Cell, CellReference} from "./decorators";

interface SiCell<C extends SiCell<any, any>, V> {

  addSubCell(cell: SiCell<any, any>): void;

  afterBuild(): void;

  afterCellsSet(): void;

  afterCreate(): void;

  buildCell<T extends SiCell<any, any>>(cellClass: new () => T, cellName?: string, parentCell?: SiCell<any, any>): T;

  buildCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;

  buildCellURI(): void;

  buildTransientCell<T extends SiCell<any, any>>(cellClass: new () => T, value?: Object): T;

  buildTransientCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, value?: Object): T | undefined;

  buildTransientInstance(): C;

  create(): C;

  createCell<T extends SiCell<any, any>>(cellClass: new () => T, cellName?: string, parentCell?: SiCell<any, any>): T;

  createCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;

  createTransientCell<T extends SiCell<any, any>>(cellClass: new () => T, value?: Object): T;

  createTransientCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, value?: Object): T | undefined;

  createTransientInstance(): C;

  destroy(cell?: SiCell<any, any>): boolean;

  destroy(cellIdentifier?: Cells.Identifier): boolean;

  destroySubCells<T extends SiCell<any, any>>(cellClass?: new () => T): void;

  destroySubCells<T extends SiCell<any, any>>(cellIdentifier?: Cells.Identifier): void;

  equals(object: Object): boolean;

  getCellClass(): new () => C;

  getCellDisplayName(): string | undefined;

  getCellName(): string;

  getCellType(): string;

  getCellURI(): string;

  getCellUUID(): string;

  getCellValue(): V | undefined;

  getCellValueAsFlatObject(): object | undefined;

  getCellValueAsObject(): object | undefined;

  getCellValueAsString(): string;

  getController(): SiCell<any, any>;

  getControllerPropertyKey(): string;

  getSelf(): C;

  getSubCell<T extends SiCell<any, any>>(cellClass: new () => T, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;

  getSubCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;

  getSubCells<T extends SiCell<any, any>>(cellClass?: new () => T): T[];

  getSubCells<T extends SiCell<any, any>>(cellIdentifier?: Cells.Identifier): T[];

  hasCellValue(): boolean;

  isControlled(cell?: SiCell<any, any> | undefined): boolean;

  isCreated(): boolean;

  isRoot(): boolean;

  isSame(cell: SiCell<any, any>): boolean;

  isTransient(): boolean;

  log(): SiLogger;

  removeSubCell(cell: SiCell<any, any>): void;

  removeSubCells(cellClass?: new () => SiCell<any, any>): void;

  removeSubCells(cellIdentifier?: Cells.Identifier): void;

  restore(data: object): C;

  restore(data: string): C;

  returnAndDestroy(): V;

  returnAsyncAndDestroy(): Promise<V>;

  root(): SiDiscoveryManager;

  rootSkill<T extends SiCell<any, any>>(cellClass: new () => T): T | undefined;

  rootSkill<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier): T | undefined;

  run(): C;

  runAndDestroy(): void;

  runAsync(): Promise<C>;

  runAsyncAndDestroy(): Promise<void>;

  save(): C;

  setCellClass(cellClass: new () => C): void;

  setCellDisplayName(displayName: string): void;

  setCellName(name: string): void;

  setCellType(cellType: string): void;

  setCellURI(cellURI: string): void;

  setCellUUID(cellUUID: string): void;

  setCellValue(value: V): C;

  setCellValueAsObject(value?: any): C;

  setCellValueAsString(value: string): C;

  setController(cell: SiCell<any, any>): void;

  setControllerPropertyKey(propertyKey: string): void;

  setCreated(created: boolean): void;

  setRootCell(cell: SiDiscoveryManager): void;

  setTransient(transient: boolean): void;

  swapSubCell(oldCell: SiCell<any, any> | undefined, newCell: SiCell<any, any> | undefined): C;

  swapSubCell(oldCellName: string | undefined, newCell: SiCell<any, any> | undefined): C;

  toFlatObject(): object;

  toFlatObject(root: boolean): object;

  toFlatString(): string;

  toJsonObject(): object;

  toJsonString(): string;

  toString(): string;
}

namespace SiCell {
  export const PROPERTY_CELL_NAME = "cellName";
  export const PROPERTY_CELL_TYPE = "cellType";
  export const PROPERTY_CELL_UUID = "cellUUID";
  export const PROPERTY_CELL_URI = "cellURI";
  export const PROPERTY_CELL_CLASS = "cellClass";
  export const PROPERTY_CELL_VALUE = "cellValue";
  export const PROPERTY_SUB_CELLS = "subCells";
  export const PROPERTY_CELL_DISPLAY_NAME = "cellDisplayName";
  export const FLAT_OBJECT_MODE_ROOT = "cellDisplayName";
  export const FLAT_OBJECT_MODE_ = "cellDisplayName";
}

class SiCellClass<C extends SiCell<any, any>, V> implements SiCell<C, V> {

  protected cellValue?: V;
  private cellClass?: new () => C;
  private cellDisplayName?: string;
  private cellName?: string;
  private cellType?: string;
  private cellURI?: string;
  private cellUUID?: string;
  private controller?: SiCell<any, any>;
  private controllerPropertyKey?: string;
  private created: boolean = false;
  private rootCell?: SiDiscoveryManager;
  private subCells: SiCell<any, any>[] = [];
  private transient: boolean = false;

  addSubCell(cell: SiCell<any, any>): void {
    if (this.getSubCell(Cells.Identifier.cellName(cell.getCellName())) !== undefined) {
      if (this.log() !== undefined) {
        this.log().error("Duplicated cell with name " + cell.getCellName() + ". Skip adding cell as sub cell.")
      } else {
        console.log("Duplicated cell with name " + cell.getCellName() + ". Skip adding cell as sub cell.")
      }

      return;
    }

    if (cell.isTransient()) {
      cell.setTransient(false);
      cell.setController(this);
    }

    if (cell.isControlled(this)) {
      cell.buildCellURI();
    }

    this.subCells.push(cell);
  }

  afterBuild(): void {
  }

  afterCellsSet(): void {
  }

  afterCreate(): void {
  }

  buildCell<T extends SiCell<any, any>>(cellClass: { new(): T }, cellName?: string, parentCell?: SiCell<any, any>): T;
  buildCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;
  buildCell<T extends SiCell<any, any>>(cellIdentifier: any, cellName?: string, parentCell?: SiCell<any, any>): T | undefined {

    if (!(cellIdentifier instanceof Cells.Identifier) &&
      (!Reflect.hasMetadata(CellType.META_CELL_TYPE, cellIdentifier) || !Reflect.hasMetadata(CellType.META_CELL_UUID, cellIdentifier))) {
      return undefined;
    } else if (cellIdentifier instanceof Cells.Identifier && cellIdentifier.getValue().length === 0) {
      return undefined;
    }

    try {
      let cellClass;

      if (cellIdentifier instanceof Cells.Identifier) {
        cellClass = this.root().findCellClass(cellIdentifier);
      } else {
        cellClass = cellIdentifier;
      }

      if (cellClass === undefined) {
        return undefined;
      }

      parentCell = parentCell !== undefined ? parentCell : this;

      let cellType = Reflect.getMetadata(CellType.META_CELL_TYPE, cellClass as object);
      let cellUUID = Reflect.getMetadata(CellType.META_CELL_UUID, cellClass as object);

      if (cellIdentifier instanceof Cells.Identifier) {
        if (cellIdentifier.isType()) {
          cellType = cellIdentifier.getValue();
        }
        if (cellIdentifier.isUUID()) {
          cellUUID = cellIdentifier.getValue();
        }
      }

      if (cellName === undefined) {
        cellName = Cells.UUID.random();
      }


      let cell: T = new cellClass();
      cell.setCellName(cellName);
      cell.setCellType(cellType);
      cell.setCellUUID(cellUUID);
      cell.setCellClass(cellIdentifier);
      cell.setRootCell(this.rootCell as SiDiscoveryManager);
      cell.setController(parentCell);
      cell.buildCellURI();
      cell.afterBuild();

      parentCell.addSubCell(cell);

      return cell;

    } catch (error) {
      this.log().error("Error Handling:", error);
    }

    return undefined;
  }

  buildCellURI(): void {
    let uri = "";

    if (this.isControlled()) {
      uri = this.getController().getCellURI();
    } else if (this.isTransient()) {
      uri = "transient:/";
    }

    if (this.getCellName() !== undefined) {
      uri = uri + "/" + this.getCellName();
    } else {
      uri = uri + "/" + this.getCellType();
    }

    this.setCellURI(uri);
    this.getSubCells().forEach((subCell) => {
      if (subCell.isControlled(this)) {
        subCell.buildCellURI();
      }
    });
  }

  buildTransientCell<T extends SiCell<any, any>>(cellClass: { new(): T }, value?: Object): T;
  buildTransientCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, value?: Object): T | undefined;
  buildTransientCell<T extends SiCell<any, any>>(cellIdentifier: any, value?: Object): T | undefined {

    if (!(cellIdentifier instanceof Cells.Identifier) &&
      (!Reflect.hasMetadata(CellType.META_CELL_TYPE, cellIdentifier) || !Reflect.hasMetadata(CellType.META_CELL_UUID, cellIdentifier))) {
      return undefined;
    } else if (cellIdentifier instanceof Cells.Identifier && cellIdentifier.getValue().length === 0) {
      return undefined;
    }

    try {
      let cellClass;

      if (cellIdentifier instanceof Cells.Identifier) {
        cellClass = this.root().findCellClass(cellIdentifier);
      } else {
        cellClass = cellIdentifier;
      }

      if (cellClass === undefined) {
        return undefined;
      }

      let cellType = Reflect.getMetadata(CellType.META_CELL_TYPE, cellClass as Object);
      let cellUUID = Reflect.getMetadata(CellType.META_CELL_UUID, cellClass as Object);

      if (cellIdentifier instanceof Cells.Identifier) {
        if (cellIdentifier.isType()) {
          cellType = cellIdentifier.getValue();
        }
        if (cellIdentifier.isUUID()) {
          cellUUID = cellIdentifier.getValue();
        }
      }

      let cell: T = new cellClass();
      cell.setCellName(Cells.UUID.random());
      cell.setCellType(cellType);
      cell.setCellUUID(cellUUID);
      cell.setCellClass(cellClass);
      cell.setRootCell(this.rootCell as SiDiscoveryManager);
      cell.setTransient(true);
      cell.afterBuild();

      if (value !== undefined) {
        cell.setCellValueAsObject(value);
      }

      return cell;

    } catch (error) {
      this.log().error("Error Handling:", error);
    }

    return undefined;
  }

  buildTransientInstance(): C {
    return this.buildTransientCell(this.getCellClass()) as C;
  }

  create(): C {
    this.root().injectCells(this);
    this.root().analyzeCell(this);

    this.created = true;

    this.afterCreate();

    return this.getSelf();
  }

  createCell<T extends SiCell<any, any>>(cellClass: { new(): T }, cellName?: string, parentCell?: SiCell<any, any>): T;
  createCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;
  createCell<T extends SiCell<any, any>>(cellIdentifier: any, cellName?: string, parentCell?: SiCell<any, any>): T | undefined {
    let cell = this.buildCell<T>(cellIdentifier, cellName, parentCell);

    if (cell !== undefined) {
      cell.create();

      return cell as T;
    }

    return undefined;
  }

  createTransientCell<T extends SiCell<any, any>>(cellClass: { new(): T }, value?: Object): T;
  createTransientCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, value?: Object): T | undefined;
  createTransientCell<T extends SiCell<any, any>>(cellIdentifier: any, value?: Object): T | undefined {
    let cell = this.buildTransientCell(cellIdentifier);

    if (cell !== undefined) {
      cell.create();

      if (value !== undefined) {
        cell.setCellValueAsObject(value);
      }

      return cell as T;
    }

    return undefined;
  }

  createTransientInstance(): C {
    let transientCell: C = this.buildTransientInstance();
    transientCell.setCellName(this.getCellName());
    transientCell.setCellValueAsObject(this.getCellValue());
    transientCell.setController(this.getController());
    transientCell.buildCellURI();

    this.getSubCells().forEach((subCell) => {
      let transientSubCell;

      if (subCell.isControlled(this)) {
        transientSubCell = subCell.createTransientInstance();
        transientSubCell.setController(transientCell);
        transientSubCell.setCellName(subCell.getCellName());
        transientSubCell.setCellDisplayName(subCell.getCellDisplayName());
        transientSubCell.setCellValueAsObject(subCell.getCellValue());
        transientSubCell.setControllerPropertyKey(subCell.getControllerPropertyKey());
        transientSubCell.buildCellURI();

        if (transientSubCell.getControllerPropertyKey() !== undefined) {
          // TODO: Bessere Prüfung für Objekt und Interfaces einbauen
          if (transientSubCell.getCellType() === "cell-reference") {
            Reflect.set(transientCell, transientSubCell.getControllerPropertyKey(), transientSubCell.getCellValue());
          } else {
            Reflect.set(transientCell, transientSubCell.getControllerPropertyKey(), transientSubCell);
          }
        }
      } else {
        transientSubCell = subCell;
      }

      try {
        transientCell.addSubCell(transientSubCell as SiCell<any, any>);
      } catch (error) {
        this.log().error("TODO: Error Handling", error);
      }
    })

    return transientCell;
  }

  destroy(cell?: SiCell<any, any>): boolean;
  destroy(cellIdentifier?: Cells.Identifier): boolean;
  destroy(cellIdentifier?: SiCell<any, any> | Cells.Identifier): boolean {

    if (cellIdentifier === undefined) {
      return this.destroy(this);
    } else if (cellIdentifier instanceof Cells.Identifier) {
      // TODO: Implement
      throw Error("Not implemented");
    } else {
      cellIdentifier.getSubCells().forEach((subCell) => {
        if (subCell.isControlled(cellIdentifier as SiCell<any, any>)) {
          subCell.destroy();
        }
      })
    }

    if (cellIdentifier.isControlled() &&
      cellIdentifier.getController().hasOwnProperty(cellIdentifier.getCellName()) &&
      cellIdentifier === Reflect.get(cellIdentifier.getController(), cellIdentifier.getCellName())) {

      Reflect.set(cellIdentifier.getController(), cellIdentifier.getCellName(), undefined);
    }

    cellIdentifier?.removeSubCells();
    cellIdentifier = undefined;

    return true;
  }

  destroySubCells<T extends SiCell<any, any>>(cellClass?: { new(): T }): void;
  destroySubCells<T extends SiCell<any, any>>(cellIdentifier?: Cells.Identifier): void;
  destroySubCells<T extends SiCell<any, any>>(cellIdentifier?: any): void {
    if (cellIdentifier === undefined) {
      this.getSubCells().forEach((subCell) => {
        this.removeSubCell(subCell);
        if (subCell.isControlled(this)) {
          subCell.destroy();
        }
      })
    } else if (cellIdentifier instanceof Cells.Identifier) {
      // TODO: Implement
      throw Error("Not implemented");
    } else {
      this.getSubCells(cellIdentifier).forEach((subCell) => {
        this.removeSubCell(subCell);
        if (subCell.isControlled(cellIdentifier as SiCell<any, any>)) {
          subCell.destroy();
        }
      })
    }
  }

  equals(object: Object): boolean {
    try {
      (<SiCell<any, any>>object).getCellName();
    } catch (error) {
      return false;
    }

    let cell = <SiCell<any, any>>object;

    if (!this.isSame(cell)) {
      return false;
    }

    if (this.getController() === undefined && cell.getController() !== undefined) {
      return false;
    }

    if (this.getController() !== undefined && cell.getController() === undefined) {
      return false;
    }

    if (this.getController() !== undefined && cell.getController() !== undefined &&
      !this.getController().equals(cell.getController())) {
      return false;
    }

    return this.cellName === cell.getCellName() && this.cellURI === cell.getCellURI();
  }

  getCellClass(): new () => C {
    return this.cellClass as new () => C;
  }

  getCellDisplayName(): string | undefined {
    return this.cellDisplayName;
  }

  getCellName(): string {
    return this.cellName as string;
  }

  getCellType(): string {
    return this.cellType as string;
  }

  getCellURI(): string {
    return this.cellURI as string;
  }

  getCellUUID(): string {
    return this.cellUUID as string;
  }

  getCellValue(): V | undefined {
    return this.cellValue as V;
  }

  getCellValueAsFlatObject(): object | undefined {
    return this.getCellValueAsObject();
  }

  getCellValueAsObject(): object | undefined {
    if (!this.hasCellValue()) {
      return undefined;
    }

    return this.getCellValue() as unknown as object;
  }

  getCellValueAsString(): string {
    if (!this.hasCellValue()) {
      return "";
    }

    try {
      (<SiCell<any, any>><unknown>this.getCellValue()).getCellName();
      return (<SiCell<any, any>><unknown>this.getCellValue()).toString();
    } catch (error) {
      if (typeof this.getCellValue() === "object" || Array.isArray(this.getCellValue())) {
        return JSON.stringify(this.getCellValue());
      } else {
        return (<Object>this.getCellValue()).toString();
      }
    }
  }

  getController(): SiCell<any, any> {
    return this.controller as SiCell<any, any>;
  }

  getControllerPropertyKey(): string {
    return this.controllerPropertyKey as string;
  }

  getSelf(): C {
    return this as unknown as C;
  }

  getSubCell<T extends SiCell<any, any>>(cellClass: { new(): T }, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;

  getSubCell<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier, cellName?: string, parentCell?: SiCell<any, any>): T | undefined;

  getSubCell<T extends SiCell<any, any>>(cellIdentifier: any, cellName?: string, parentCell?: SiCell<any, any>): T | undefined {

    if (cellIdentifier instanceof Cells.Identifier && cellIdentifier.getValue().length === 0) {
      return undefined;
    }

    if (!(cellIdentifier instanceof Cells.Identifier)) {
      if (!Reflect.hasMetadata(CellType.META_CELL_TYPE, cellIdentifier)) {
        return undefined;
      }

      cellIdentifier = Cells.Identifier.type(Reflect.getMetadata(CellType.META_CELL_TYPE, cellIdentifier));
    }

    parentCell = parentCell !== undefined ? parentCell : this;
    let cell: SiCell<any, any> | undefined = undefined;
    let identifier = cellIdentifier.getValue();
    let path: string[] = [];
    let uri;

    if (cellIdentifier.isURI()) {
      uri = Cells.URI.parse(identifier);

      if (uri.path.length === 0) {
        return undefined;
      }

      path = uri.path.substring(1).split("/");
      identifier = uri.firstPath();
    }

    for (let subCell of parentCell.getSubCells()) {
      if (cellIdentifier.isCellName() && subCell.getCellName() === identifier) {
        cell = subCell;
      } else if (cellIdentifier.isType() && subCell.getCellType() === identifier &&
        (cellName === undefined || subCell.getCellName() === cellName)) {
        cell = subCell;
      } else if (cellIdentifier.isURI() && subCell.getCellName() === identifier &&
        (cellName === undefined || subCell.getCellName() === cellName)) {
        cell = subCell;
      } else if (cellIdentifier.isUUID() && subCell.getCellUUID() === identifier &&
        (cellName === undefined || subCell.getCellName() === cellName)) {
        cell = subCell;
      }

      if (cell !== undefined) {
        break;
      }
    }

    if (uri !== undefined && cell !== undefined && cellIdentifier.isURI() && path.length > 1) {
      uri.cutFirstPath()

      cell = cell.getSubCell(Cells.Identifier.uri(uri.toString()!));
    }

    return cell as T;
  }

  getSubCells<T extends SiCell<any, any>>(cellClass?: { new(): T }): T[];

  getSubCells<T extends SiCell<any, any>>(cellIdentifier?: Cells.Identifier): T[];

  getSubCells<T extends SiCell<any, any>>(cellIdentifier?: any): T[] {
    if (cellIdentifier === undefined) {
      return this.subCells as T[];
    } else if (cellIdentifier instanceof Cells.Identifier) {
      if (cellIdentifier.isType()) {
        return this.subCells.filter(subCell => subCell.getCellType() === cellIdentifier.getValue()) as T[];
      }
      if (cellIdentifier.isUUID()) {
        return this.subCells.filter(subCell => subCell.getCellUUID() === cellIdentifier.getValue()) as T[];
      }
    } else {
      return this.subCells.filter(subCell => subCell.getCellClass() === cellIdentifier) as T[];
    }

    return [];
  }

  hasCellValue(): boolean {
    return this.getCellValue() !== undefined;
  }

  isControlled(cell?: SiCell<any, any> | undefined): boolean {
    if (cell !== undefined) {
      return this.controller === cell;
    }

    return this.controller !== undefined;
  }

  isCreated(): boolean {
    return this.created;
  }

  isRoot(): boolean {
    return false;
  }

  isSame(cell: SiCell<any, any>): boolean {
    if (this === cell) {
      return true;
    }

    if (cell === undefined) {
      return false;
    }

    /* TODO: Prüfung auf cellClass ist noch nicht 100% zuverlässig
    if (cell.getCellClass() !== undefined && this.getCellClass() !== cell.getCellClass()) {
      return false;
    }*/

    return this.getCellType() === cell.getCellType(); // TODO: && this.cellUUID === cell.getCellUUID();
  }

  isTransient(): boolean {
    return this.transient;
  }

  log(): SiLogger {
    return this.root().getLogger(this);
  }

  removeSubCell(cell: SiCell<any, any>): void {
    if (cell === undefined) {
      return;
    }

    this.subCells = this.subCells.filter((value) => {
      return !cell.equals(value);
    });

    if (cell.isControlled(this)) {
      if (cell.getControllerPropertyKey() !== undefined) {
        Reflect.set(this, cell.getControllerPropertyKey(), undefined);
      }
    } else {
      if (cell.equals(Reflect.get(this, cell.getCellName()))) {
        Reflect.set(this, cell.getCellName(), undefined);
      }
    }
  }

  removeSubCells(cellClass?: { new(): SiCell<any, any> }): void;

  removeSubCells(cellIdentifier?: Cells.Identifier): void;

  removeSubCells(cellIdentifier?: { new(): SiCell<any, any> } | Cells.Identifier): void {
    if (cellIdentifier === undefined) {
      this.subCells.length = 0;
    } else {
      // TODO: Implement
      this.log().error("removeSubCells with cellIdentifier not implemented.");
    }
  }

  restore(data: object): C;

  restore(data: string): C;

  restore(data: object | string): C {
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (error) {
        this.log().debug(error);

        return this.getSelf();
      }
    }

    let cellValue = Reflect.get(data as object, SiCell.PROPERTY_CELL_VALUE);
    let subCells = Reflect.get(data as object, SiCell.PROPERTY_SUB_CELLS);

    if (cellValue !== undefined) {
      if (typeof cellValue !== "string") {
        cellValue = JSON.stringify(cellValue);
      }

      this.setCellValueAsString(cellValue);
    }

    this.removeSubCells();

    if (subCells !== undefined) {
      for (let entry of subCells) {
        let subCellType = Reflect.get(entry, SiCell.PROPERTY_CELL_TYPE);

        if (subCellType === undefined || subCellType.length === 0) {
          this.log().debug("Cell type for sub cell is null or empty. Skipping entry.");
          continue;
        }

        let subCellName = Reflect.get(entry, SiCell.PROPERTY_CELL_NAME);
        let subCellUUID = Reflect.get(entry, SiCell.PROPERTY_CELL_UUID);
        let subCell = this.createTransientCell(Cells.Identifier.type(subCellType));

        if (subCell === undefined) {
          this.log().debug("Cell type " + subCellType + " not present in discovery. " +
            "Can not add cell as sub cell.", entry);
          continue;
        }
        subCell.setCellName(subCellName);
        subCell.restore(entry);

        this.swapSubCell(subCellName, subCell);
      }
    }

    let subCell: SiCell<any, any> | undefined = undefined;
    let subCellType: string | undefined = undefined;

    Cell.Helper.getProperties(this).forEach(property => {
      if (!Reflect.has(data as object, property.propertyKey)) {
        return;
      }

      if (Reflect.get(this, property.propertyKey) !== undefined) {
        this.log().trace("Field with name " + property.propertyKey
          + " is not null. Skipping assignment of the sub cell to the field.",
          Reflect.get(this, property.propertyKey).toString());

        return;
      }

      let element = Reflect.get(data as object, property.propertyKey);

      if (typeof element === "object" && Reflect.has(element, SiCell.PROPERTY_CELL_TYPE)) {
        subCellType = Reflect.get(element, SiCell.PROPERTY_CELL_TYPE);
      }

      if (subCellType !== undefined && property.cellType !== subCellType) {
        this.log().trace("Field cell type does not equal to sub cell type. "
          + "Skipping assignment of the sub cell to the field.", property.cellType, subCellType);

        return;
      }

      subCell = this.createTransientCell(Cells.Identifier.type(property.cellType));

      if (subCell === undefined) {
        this.log().warn("Cell type " + subCellType + " not present in discovery. " +
          "Skipping assignment of the sub cell to the field.");

        return;
      }

      if (typeof element === "object") {
        subCell.restore(element);
      } else {
        subCell.setCellValueAsString(JSON.stringify(element));
      }

      this.swapSubCell(property.propertyKey, subCell);
    });

    return this.getSelf();
  }

  returnAndDestroy(): V {
    this.run();
    let val = this.getCellValue();
    this.destroy();

    return val as V;
  }

  async returnAsyncAndDestroy(): Promise<V> {
    await this.runAsync();
    let val = this.cellValue;
    this.destroy();

    return Promise.resolve(val) as Promise<V>;
  }

  root(): SiDiscoveryManager {
    return this.rootCell as SiDiscoveryManager;
  }

  rootSkill<T extends SiCell<any, any>>(cellClass: { new(): T }): T | undefined;

  rootSkill<T extends SiCell<any, any>>(cellIdentifier: Cells.Identifier): T | undefined;

  rootSkill<T extends SiCell<any, any>>(cellIdentifier: any): T | undefined {
    return this.getSubCell(cellIdentifier, undefined, this.root());
  }

  run(): C {
    throw new Error("Method not implemented.");
  }

  runAndDestroy(): void {
    this.run();
    this.destroy();
  }

  async runAsync(): Promise<C> {
    throw new Error("Method not implemented.");
  }

  async runAsyncAndDestroy(): Promise<void> {
    this.runAsync().then(this.destroy);
  }

  save(): C {
    throw new Error("Method not implemented.");
  }

  setCellClass(cellClass: { new(): C }): void {
    this.cellClass = cellClass;
  }

  setCellDisplayName(displayName: string): void {
    this.cellDisplayName = displayName;
  }

  setCellName(name: string): void {
    this.cellName = name;
  }

  setCellType(cellType: string): void {
    this.cellType = cellType;
  }

  setCellURI(cellURI: string): void {
    this.cellURI = cellURI;
  }

  setCellUUID(cellUUID: string) {
    this.cellUUID = cellUUID;
  }

  setCellValue(value: V): C {
    this.cellValue = value;
    return this.getSelf();
  }

  setCellValueAsObject(value: any): C {
    try {
      this.setCellValue(value as V);
    } catch (error) {
      this.log().error("TODO: Exception Handling", error);
    }
    return this.getSelf();
  }

  setCellValueAsString(value: string): C {
    try {
      this.setCellValue(value as unknown as V);
    } catch (error) {
      this.log().error("TODO: Exception Handling", error);
    }
    return this.getSelf();
  }

  setController(cell: SiCell<any, any>): void {
    this.controller = cell;
  }

  setControllerPropertyKey(propertyKey: string): void {
    this.controllerPropertyKey = propertyKey;
  }

  setCreated(created: boolean): void {
    this.created = created;
  }

  setRootCell(cell: SiDiscoveryManager): void {
    this.rootCell = cell;
  }

  setTransient(transient: boolean): void {
    this.transient = transient;
  }

  swapSubCell(oldCell: SiCell<any, any> | undefined, newCell: SiCell<any, any> | undefined): C;

  swapSubCell(cellName: string | undefined, newCell: SiCell<any, any> | undefined): C;

  swapSubCell(oldCellIdentifier: SiCell<any, any> | undefined | string, newCell: SiCell<any, any> | undefined): C {
    if (oldCellIdentifier === undefined) {
      this.log().error("Error while swapping cell. old cell identifier is null or empty.");

      return this.getSelf();
    }
    if (newCell === undefined) {
      this.log().error("Error while swapping cell. new cell is null.");

      return this.getSelf();
    }
    if (typeof oldCellIdentifier === "string" && oldCellIdentifier.length === 0) {
      this.log().error("Error while swapping cell. old cell name is empty.");

      return this.getSelf();
    }

    let subCell, cellName, controllerPropertyKey, cellNameIdentifier;

    if (typeof oldCellIdentifier === "string") {
      cellNameIdentifier = Cells.Identifier.cellName(oldCellIdentifier);
      subCell = this.getSubCell(cellNameIdentifier, oldCellIdentifier);
    } else {
      cellNameIdentifier = Cells.Identifier.cellName(oldCellIdentifier.getCellName())
      subCell = this.getSubCell(cellNameIdentifier);
    }

    if (subCell !== undefined) {
      if (!subCell.isSame(newCell)) {
        this.log().error("Error while swapping cell. The cells are not of the same type.");

        return this.getSelf();
      }

      cellName = subCell.getCellName();
      controllerPropertyKey = subCell.getControllerPropertyKey();

    } else if (typeof oldCellIdentifier === "string") {
      cellName = oldCellIdentifier;
    } else {
      this.log().error("Error while swapping cell. No such sub cell with name " + cellNameIdentifier.getValue());

      return this.getSelf();
    }

    if (newCell.isTransient()) {
      newCell.setCellName(cellName);
      newCell.setController(this);
      newCell.setTransient(false);
    }

    if (subCell !== undefined) {
      this.removeSubCell(subCell);
    }

    if (controllerPropertyKey !== undefined) {
      Reflect.set(this, controllerPropertyKey, newCell);

      if (newCell.isControlled(this)) {
        newCell.setControllerPropertyKey(controllerPropertyKey);
      }
    } else if (Cell.Helper.hasProperty(this, newCell.getCellName()) ||
      CellReference.Helper.hasProperty(this, newCell.getCellName())) {

      Reflect.set(this, newCell.getCellName(), newCell);

      if (newCell.isControlled(this)) {
        newCell.setControllerPropertyKey(newCell.getCellName());
      }
    }

    this.addSubCell(newCell);

    if (subCell !== undefined && subCell.isControlled(this)) {
      subCell = undefined;
    }

    return this.getSelf();
  }

  toFlatObject(): object;

  toFlatObject(root: boolean): object;

  toFlatObject(root?: boolean): object {
    if (root === undefined) {
      root = true;
    }

    let flatObject;

    if (root) {
      flatObject = {
        cellType: this.getCellType(),
        cellUUID: this.getCellUUID(),

      }
    } else if (this.subCells.length > 0) {
      flatObject = {
        cellType: this.getCellType(),
        cellUUID: this.getCellUUID(),
      }
    } else {
      return this.getCellValueAsFlatObject() as unknown as object;
    }

    if (this.hasCellValue()) {
      Reflect.set(flatObject, SiCell.PROPERTY_CELL_VALUE, this.getCellValueAsFlatObject());
    }

    if (this.subCells.length > 0) {
      for (let subCell of this.getSubCells()) {
        let subCellFlatObject = subCell.toFlatObject(false);

        if (subCell.isControlled(this) && subCell.getControllerPropertyKey() !== undefined) {
          Reflect.set(flatObject, subCell.getControllerPropertyKey(), subCellFlatObject);
        }
      }
    }

    return flatObject;
  }

  toFlatString(): string {
    return JSON.stringify(this.toFlatObject());
  }

  toJsonObject(): object {
    let jsonObject = {
      cellName: this.getCellName(),
      cellType: this.getCellType(),
      cellUUID: this.getCellUUID(),
      cellURI: this.cellURI,
      cellClass: this.cellClass?.name,
      cellDisplayName: this.getCellDisplayName(),
      cellValue: this.getCellValueAsString(),
      subCells: <any>[]
    }

    if (this.subCells.length > 0) {
      for (let subCell of this.getSubCells()) {
        let subCellJsonObject = subCell.toJsonObject();
        jsonObject.subCells.push(subCellJsonObject);

        if (subCell.isControlled(this) && subCell.getControllerPropertyKey() !== undefined) {
          Reflect.set(jsonObject, subCell.getControllerPropertyKey(), subCellJsonObject);
        }
      }
    }

    return jsonObject;
  }

  toJsonString(): string {
    return JSON.stringify(this.toJsonObject());
  }

  toString(): string {
    return this.toJsonString();
  }
}

export {SiCell};
export default SiCellClass;
