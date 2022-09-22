import SiCellClass, {SiCell} from "../../siCell";
import CellType from "../../decorators/cellType";

namespace SiConsoleBanner {
  export const CELL_TYPE = "console-banner";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SiConsoleBanner extends SiCell<SiConsoleBanner, string> {
}

@CellType(
  SiConsoleBanner.CELL_TYPE,
  SiConsoleBanner.CELL_UUID
)
class SiConsoleBannerClass extends SiCellClass<SiConsoleBanner, string> implements SiConsoleBanner {

  getCellValue(): string | undefined {
    let banner = `

 █████             ███                            ███████     █████████
░░███             ░░░                           ███░░░░░███  ███░░░░░███
 ░███  ████████   ████   ██████  ████████      ███     ░░███░███    ░░░
 ░███ ░░███░░███ ░░███  ███░░███░░███░░███    ░███      ░███░░█████████
 ░███  ░███ ░███  ░███ ░███ ░███ ░███ ░███    ░███      ░███ ░░░░░░░░███
 ░███  ░███ ░███  ░███ ░███ ░███ ░███ ░███    ░░███     ███  ███    ░███
 █████ ████ █████ █████░░██████  ████ █████    ░░░███████░  ░░█████████
░░░░░ ░░░░ ░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░       ░░░░░░░     ░░░░░░░░░
    `
    return banner;
  }
}

export {SiConsoleBanner};
export default SiConsoleBannerClass;
