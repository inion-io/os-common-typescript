import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";
import {SiCommunicationManager} from "../../communication/siCommunicationManager";
import Cells from "../../utils/cells";
import SiStringClass, {SiString} from "../../types/siString";
import SiCommunicationMessageClass from "../../communication/siCommunicationMessage";
import Cell from "../../decorators/cell";
import SiIntegerClass, {SiInteger} from "../../types/siInteger";
import {SiArray} from "../../types/siArray";
import SiExecuteCellSkillPayloadClass from "./communication/payload/siExecuteCellSkillPayload";
import SiListClass, {SiList} from "../../types/siList";
import {SiExecuteCellSkillInterpreter} from "./communication/siExecuteCellSkillInterpreter";
import {SiObject} from "../../types";

namespace SiRemoteCellReference {
  export const CELL_TYPE = "remote-cell-reference";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const PROTOCOL_TCP = "PROTOCOL_TCP";
  export const PROTOCOL_WEBSOCKET = "PROTOCOL_WEBSOCKET";
  export const TARGET_SELF = "TARGET_SELF";
  export const TARGET_DISCOVERY = "TARGET_DISCOVERY";
}

interface SiRemoteCellReference extends SiCell<SiRemoteCellReference, object> {
  executeMethod(skillName: SiString, args: SiArray<any>): Promise<SiCell<any, any> | undefined>;

  setProtocol(protocol: SiString): SiRemoteCellReference;

  setRemoteCellName(remoteCellName: SiString): SiRemoteCellReference;

  setRemoteCellType(remoteCellType: SiString): SiRemoteCellReference;

  setRemoteCellURI(remoteCellURI: SiString): SiRemoteCellReference;
}

@CellType(
  SiRemoteCellReference.CELL_TYPE,
  SiRemoteCellReference.CELL_UUID
)
class SiRemoteCellReferenceClass extends SiCellClass<SiRemoteCellReference, object>
  implements SiRemoteCellReference {

  @Cell(SiStringClass, Cell.Option.value(SiRemoteCellReference.PROTOCOL_TCP))
  private protocol?: SiString;
  @Cell(SiStringClass)
  private remoteCellName?: SiString;
  @Cell(SiStringClass)
  private remoteCellType?: SiString;
  @Cell(SiStringClass)
  private remoteCellURI?: SiString;

  async executeMethod(skillName: SiString, args: SiArray<any>): Promise<SiCell<any, any> | undefined> {
    // Assertion: remoteCellURI

    let communicationManager = this.rootSkill<SiCommunicationManager<any>>(
      Cells.Identifier.type(SiCommunicationManager.CELL_TYPE));
    let command = this.createTransientCell(SiStringClass, SiExecuteCellSkillInterpreter.COMMAND);
    let payload = this.createTransientCell(SiExecuteCellSkillPayloadClass);
    let message = this.createTransientCell(SiCommunicationMessageClass);
    let cellURI = this.remoteCellURI !== undefined && this.remoteCellURI.hasCellValue() ?
      this.remoteCellURI?.getCellValue() : this.getCellURI();

    payload.setURI(this.createTransientCell(SiStringClass, cellURI));
    payload.setSkillName(this.createTransientCell(SiStringClass, skillName.getCellValue()));

    message.setCommand(command);
    message.setPayload(payload);

    if (args !== undefined && args.hasCellValue() && args.getCellValue()!.length > 0) {
      let parameters: SiList<object> = this.createTransientCell(SiListClass);

      for (let arg of args.getCellValue()!) {
        parameters.push((<SiCell<any, any>><unknown>arg).toJsonObject())
      }

      payload.setParameters(parameters);
    }

    let uri = Cells.URI.parse(cellURI!);
    let host = this.createTransientCell<SiString>(SiStringClass, uri.host);
    let port = this.createTransientCell<SiInteger>(SiIntegerClass, uri.port);
    let response;

    if (this.protocol?.getCellValue() === SiRemoteCellReference.PROTOCOL_TCP) {
      response = await communicationManager?.requestResponseTCP(host, port, message);
    } else if (this.protocol?.getCellValue() === SiRemoteCellReference.PROTOCOL_WEBSOCKET) {
      response = await communicationManager?.requestResponseWebSocket(host, port, message);
    }

    if (response !== undefined && response.getPayload() !== undefined) {
      return Promise.resolve(response.getPayload());
    }

    return undefined;
  }

  setProtocol(protocol: SiString): SiRemoteCellReference {
    return this.swapSubCell(this.protocol, protocol);
  }

  setRemoteCellName(remoteCellName: SiString): SiRemoteCellReference {
    return this.swapSubCell(this.remoteCellName, remoteCellName);
  }

  setRemoteCellType(remoteCellType: SiString): SiRemoteCellReference {
    return this.swapSubCell(this.remoteCellType, remoteCellType);
  }

  setRemoteCellURI(remoteCellURI: SiString): SiRemoteCellReference {
    return this.swapSubCell(this.remoteCellURI, remoteCellURI);
  }
}

export {SiRemoteCellReference};
export default SiRemoteCellReferenceClass;
