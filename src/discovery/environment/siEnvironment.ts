import CellType from "../../decorators/cellType";
import {
  SiBoolean,
  SiBooleanClass,
  SiInteger,
  SiIntegerClass,
  SiList,
  SiListClass,
  SiString,
  SiStringClass
} from "../../types";
import {SiCell, SiCellClass} from "../../index";

namespace SiEnvironment {
  export const CELL_TYPE = "environment";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiEnvironment extends SiCell<SiEnvironment, void> {
  getExternalHost(): SiString;

  getHosts(): SiList<SiString>;

  getInternalHost(): SiString;

  getPort(): SiInteger;

  isClient(): SiBoolean;

  isServer(): SiBoolean;
}

@CellType(
  SiEnvironment.CELL_TYPE,
  SiEnvironment.CELL_UUID
)
class SiEnvironmentClass extends SiCellClass<SiEnvironment, void> implements SiEnvironment {

  private client?: SiBoolean;
  private externalHosts?: SiList<SiString>;
  private hosts?: SiList<SiString>;
  private internalHost?: SiString;
  private port?: SiInteger;
  private server?: SiBoolean;

  create(): SiEnvironment {
    this.hosts = this.createCell<SiList<SiString>>(SiListClass, "hosts");
    this.externalHosts = this.createCell<SiList<SiString>>(SiListClass, "externalHosts");
    this.internalHost = this.createCell<SiString>(SiStringClass, "internalHost");
    this.port = this.createCell<SiInteger>(SiIntegerClass, "port");
    this.server = this.createCell<SiBoolean>(SiBooleanClass, "server");
    this.client = this.createCell<SiBoolean>(SiBooleanClass, "client");

    const os = require(("os"));

    if (os && typeof os.networkInterfaces === "function") {
      const interfaces = require('os').networkInterfaces();

      Object.keys(interfaces).forEach(entry => {
        interfaces[entry].filter((details: { family: string; internal: boolean; address: any; }) => {
          if (details.family === 'IPv4') {
            this.hosts!.push(this.createTransientCell(SiStringClass, details.address));

            if (details.internal) {
              this.internalHost?.setCellValue(details.address);
            } else {
              this.externalHosts!.push(this.createTransientCell(SiStringClass, details.address));
            }
          }
        });
      });
    } else {
      this.hosts!.push(this.createTransientCell(SiStringClass, "localhost"));
      this.externalHosts!.push(this.createTransientCell(SiStringClass, "localhost"));
      this.internalHost?.setCellValue("localhost");
    }

    /* TODO: PortScanner implementieren
    const EvilScan = require('evilscan');

    var scanner = new EvilScan({
      target: '192.168.75.95',
      port: '4000',
      status: 'O',
    });

    scanner.on('start', function () {
      console.log('started lumi scanning!');
    });
    scanner.on('done', function () {
      console.log('Finished lumi scanning!');
    });

    scanner.run();
    */

    //this.host?.setCellValue("192.168.75.38");
    //this.host?.setCellValue("192.168.109.131");

    //this.log().debug(this.getExternalHost())

    this.port?.setCellValue(4000);
    this.client?.setCellValue((typeof window != 'undefined' && window.document !== undefined));
    this.server?.setCellValue(!(this.client?.getCellValue()));

    this.setCreated(true);

    return this.getSelf();
  }

  getExternalHost(): SiString {
    let host = this.getInternalHost();

    if (this.externalHosts !== undefined && this.externalHosts.hasCellValue()) {
      host = this.externalHosts!.getCellValue()![0];

      this.externalHosts.getCellValue()?.forEach(entry => {
        if (entry.getCellValue()?.startsWith("192")) {
          host = entry;
        }
      });
    }

    return host;
  }

  getHosts(): SiList<SiString> {
    return this.hosts!;
  }

  getInternalHost(): SiString {
    return this.internalHost as SiString;
  }

  getPort(): SiInteger {
    return this.port!;
  }

  isClient(): SiBoolean {
    return this.client!;
  }

  isServer(): SiBoolean {
    return this.server!;
  }


}

export {SiEnvironment};
export default SiEnvironmentClass;
