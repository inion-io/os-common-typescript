import "reflect-metadata";

function CellType(
  type: string,
  uuid: string,
  component: boolean = false
) {
  return function (target: Object) {
    Reflect.defineMetadata(CellType.META_CELL_TYPE, type, target);
    Reflect.defineMetadata(CellType.META_CELL_UUID, uuid, target);
    Reflect.defineMetadata(CellType.META_COMPONENT, component, target);
  }
}

namespace CellType {
  export const META_CELL_TYPE = "cellType";
  export const META_CELL_UUID = "cellUUID";
  export const META_COMPONENT = "component";
}

export default CellType;

