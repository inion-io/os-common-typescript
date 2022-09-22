import SiCellClass, {SiCell} from "../siCell";
import CellType from "../decorators/cellType";
import {SiCommunicationMessage} from "./siCommunicationMessage";
import {SiCommunicationInterpreter} from "./interpreter/siCommunicationInterpreter";
import {SiString} from "../types/siString";
import {SiInteger} from "../types/siInteger";
import SkProcessRequestClass, {SkProcessRequest} from "./skills/skProcessRequest";
import Cell from "../decorators/cell";
import SkProcessResponseClass, {SkProcessResponse} from "./skills/skProcessResponse";
import SkRegisterInterpreterClass, {SkRegisterInterpreter} from "./skills/skRegisterInterpreter";
import SiCommunicationInterpreterRegistryClass, {
  SiCommunicationInterpreterRegistry
} from "./interpreter/siCommunicationInterpreterRegistry";

namespace SiCommunicationManager {
  export const CELL_TYPE = "communication-manager";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiCommunicationManager<C extends SiCell<any, any>> extends SiCell<C, SiCell<any, any>> {
  connectWebSocket(host: SiString, port: SiInteger): C;

  listenTCP(host: SiString, port: SiInteger): C;

  listenWebSocket(host: SiString, port: SiInteger): C;

  processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage>;

  processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage>;

  registerInterpreter(interpreter: SiCommunicationInterpreter): C;

  requestResponseTCP(host: SiString, port: SiInteger, message: SiCommunicationMessage): Promise<SiCommunicationMessage>;

  requestResponseWebSocket(host: SiString, port: SiInteger, message: SiCommunicationMessage): Promise<SiCommunicationMessage>;
}

@CellType(
  SiCommunicationManager.CELL_TYPE,
  SiCommunicationManager.CELL_UUID
)
abstract class SiCommunicationManagerClass<C extends SiCell<any, any>> extends SiCellClass<C, SiCell<any, any>>
  implements SiCommunicationManager<C> {

  @Cell(SiCommunicationInterpreterRegistryClass)
  private communicationInterpreterRegistry?: SiCommunicationInterpreterRegistry
  @Cell(SkProcessRequestClass)
  private skProcessRequest?: SkProcessRequest
  @Cell(SkProcessResponseClass)
  private skProcessResponse?: SkProcessResponse
  @Cell(SkRegisterInterpreterClass)
  private skRegisterInterpreter?: SkRegisterInterpreter;

  abstract connectWebSocket(host: SiString, port: SiInteger): C;

  abstract listenTCP(host: SiString, port: SiInteger): C;

  abstract listenWebSocket(host: SiString, port: SiInteger): C;

  async processRequest(message: SiCommunicationMessage): Promise<SiCommunicationMessage> {
    // TODO: Check return type problem without !
    return await this.skProcessRequest?.createTransientInstance()
    .setCellValue(message)
    .returnAsyncAndDestroy()!;
  }

  async processResponse(message: SiCommunicationMessage): Promise<SiCommunicationMessage> {
    // TODO: Check return type problem without !
    return await this.skProcessResponse?.createTransientInstance()
    .setCellValue(message)
    .returnAsyncAndDestroy()!;
  }

  registerInterpreter(interpreter: SiCommunicationInterpreter): C {
    try {
      this.skRegisterInterpreter?.createTransientInstance()
      .setCellValue(interpreter)
      .runAndDestroy();
    } catch (error) {
      this.log().error("TODO: Exception Handling", error);
    }

    return this.getSelf();
  }

  abstract requestResponseTCP(host: SiString, port: SiInteger, message: SiCommunicationMessage): Promise<SiCommunicationMessage>;

  abstract requestResponseWebSocket(host: SiString, port: SiInteger, message: SiCommunicationMessage): Promise<SiCommunicationMessage>;
}

export {SiCommunicationManager};
export default SiCommunicationManagerClass;
