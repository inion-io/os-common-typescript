import CellType from "../../../decorators/cellType";
import SiCommunicationInterpreterClass, {
  SiCommunicationInterpreter
} from "../../../communication/interpreter/siCommunicationInterpreter";
import SiStringClass, {SiString} from "../../../types/siString";
import Cell from "../../../decorators/cell";
import SiCommunicationMessageClass, {
  SiCommunicationMessage
} from "../../../communication/siCommunicationMessage";
import {SiRemoteDiscoveryManager} from "../siRemoteDiscoveryManager";
import SiRemoteDiscoveryClass, {SiRemoteDiscovery} from "../siRemoteDiscovery";

namespace SiDiscoveryExchangeInterpreter {
  export const CELL_TYPE = "discovery-exchange-communication-interpreter";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const COMMAND = "discovery-exchange";
}

interface SiDiscoveryExchangeInterpreter extends SiCommunicationInterpreter {
}

@CellType(
  SiDiscoveryExchangeInterpreter.CELL_TYPE,
  SiDiscoveryExchangeInterpreter.CELL_UUID
)
class SiDiscoveryExchangeInterpreterClass extends SiCommunicationInterpreterClass
  implements SiDiscoveryExchangeInterpreter {

  @Cell(SiStringClass, Cell.Option.value(SiDiscoveryExchangeInterpreter.COMMAND))
  private command?: SiString;

  getCommand(): SiString {
    return this.command as SiString;
  }

  async processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined> {
    let response = this.createTransientCell(SiCommunicationMessageClass);
    response?.setCommand(this.createTransientCell(SiStringClass, SiDiscoveryExchangeInterpreter.COMMAND)!);
    response?.setPayload(this.createTransientCell(SiRemoteDiscoveryClass).restore(this.root().toJsonObject()));

    let remoteDiscoveryManager = <SiRemoteDiscoveryManager>this.getController();
    remoteDiscoveryManager?.processRemoteDiscovery(message.getPayload() as SiRemoteDiscovery);

    return response;
  }

  async processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined> {
    let remoteDiscoveryManager = <SiRemoteDiscoveryManager>this.getController();
    //remoteDiscoveryManager?.processRemoteDiscovery(message.getSender(), message.getPayload() as SiDiscoveryManager);

    return message;
  }
}

export {SiDiscoveryExchangeInterpreter};
export default SiDiscoveryExchangeInterpreterClass;
