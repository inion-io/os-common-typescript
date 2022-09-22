import {Cell, CellType} from "../../../../decorators";
import SiCellClass, {SiCell} from "../../../../siCell";
import SiListClass, {SiList} from "../../../../types/siList";
import {SiString, SiStringClass} from "../../../../types";

namespace SiExecuteCellSkillPayload {
  export const CELL_TYPE = "execute-cell-skill-communication-payload";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiExecuteCellSkillPayload extends SiCell<SiExecuteCellSkillPayload, void> {
  getParameters(): SiList<any>;

  getSkillName(): SiString;

  getURI(): SiString;

  setParameters(parameters: SiList<any>): SiExecuteCellSkillPayload;

  setSkillName(skillName: SiString): SiExecuteCellSkillPayload;

  setURI(uri: SiString): SiExecuteCellSkillPayload;
}

@CellType(
  SiExecuteCellSkillPayload.CELL_TYPE,
  SiExecuteCellSkillPayload.CELL_UUID
)
class SiExecuteCellSkillPayloadClass extends SiCellClass<SiExecuteCellSkillPayload, void> implements SiExecuteCellSkillPayload {

  @Cell(SiListClass)
  private parameters?: SiList<any>;
  @Cell(SiStringClass)
  private skillName?: SiString;
  @Cell(SiStringClass)
  private uri?: SiString;

  getParameters(): SiList<any> {
    return this.parameters as SiList<any>;
  }

  getSkillName(): SiString {
    return this.skillName as SiString;
  }

  getURI(): SiString {
    return this.uri as SiString;
  }

  setParameters(parameters: SiList<any>): SiExecuteCellSkillPayload {
    return this.swapSubCell(this.parameters, parameters);
  }

  setSkillName(skillName: SiString): SiExecuteCellSkillPayload {
    return this.swapSubCell(this.skillName, skillName);
  }

  setURI(uri: SiString): SiExecuteCellSkillPayload {
    return this.swapSubCell(this.uri, uri);
  }
}

export {SiExecuteCellSkillPayload};
export default SiExecuteCellSkillPayloadClass;
