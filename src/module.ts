import {
  SiErrorPayloadClass,
  SiExecuteCellSkillPayloadClass,
  SiPingPayloadClass,
  SiPongPayloadClass,
  SiRemoteCellClass,
  SiRemoteCellReferenceClass,
  SiRemoteDiscoveryClass,
  SiRemoteDiscoveryManagerClass
} from "./discovery";
import {
  SiArrayClass,
  SiBooleanClass,
  SiJsonObjectClass,
  SiListClass,
  SiLongClass, SiIntegerClass, SiObjectClass,
  SiStringClass, SiURIClass, SiUUIDClass, SiURLClass
} from "./types";


export type DiscoveryModule = {
  path: string,
  key: string,
  classes: any[]
}

export const Common:DiscoveryModule = {
  path: "@inion/common",
  key: "Common",
  classes: [
    SiArrayClass,
    SiBooleanClass,
    SiJsonObjectClass,
    SiStringClass,
    SiListClass,
    SiLongClass,
    SiIntegerClass,
    SiObjectClass,
    SiURIClass,
    SiURLClass,
    SiUUIDClass,
    SiPingPayloadClass,
    SiPongPayloadClass,
    SiErrorPayloadClass,
    SiExecuteCellSkillPayloadClass,
    SiRemoteCellClass,
    SiRemoteCellReferenceClass,
    SiRemoteDiscoveryClass,
    SiRemoteDiscoveryManagerClass
  ]
}

