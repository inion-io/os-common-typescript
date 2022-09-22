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
import {SiPingPayload} from "./payload/siPingPayload";
import SiPongPayloadClass, {SiPongPayload} from "./payload/siPongPayload";

namespace SiDiscoveryPingInterpreter {
  export const CELL_TYPE = "discovery-ping-communication-interpreter";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
  export const COMMAND = "discovery-ping";
}

interface SiDiscoveryPingInterpreter extends SiCommunicationInterpreter {
}

@CellType(
  SiDiscoveryPingInterpreter.CELL_TYPE,
  SiDiscoveryPingInterpreter.CELL_UUID
)
class SiDiscoveryPingInterpreterClass extends SiCommunicationInterpreterClass implements SiDiscoveryPingInterpreter {
  @Cell(SiStringClass, Cell.Option.value(SiDiscoveryPingInterpreter.COMMAND))
  private command?: SiString;

  getCommand(): SiString {
    return this.command as SiString;
  }

  async processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined> {
    //this.log().debug("Receive Request: " + message.toString());

    if (message.getPayload().getCellType() === SiPingPayload.CELL_TYPE) {
      let response = this.createTransientCell(SiCommunicationMessageClass);
      response?.setCommand(this.createTransientCell(SiStringClass, SiDiscoveryPingInterpreter.COMMAND)!);
      response?.setPayload(this.createTransientCell(SiPongPayloadClass));

      let remoteDiscoveryManger = <SiRemoteDiscoveryManager>this.getController();
      remoteDiscoveryManger.checkRemoteDiscovery(message.getSender());

      return response;
    }

    return undefined;
  }

  async processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage | undefined> {
    //this.log().debug("Receive Response: " + message.toString());

    if (message.getPayload().getCellType() === SiPongPayload.CELL_TYPE) {
      let remoteDiscoveryManger = <SiRemoteDiscoveryManager>this.getController();
      remoteDiscoveryManger.checkRemoteDiscovery(message.getSender());
    }

    return message;
  }
}

export {SiDiscoveryPingInterpreter};
export default SiDiscoveryPingInterpreterClass;
