import { Sync } from "../enum/sync";

export const syncStateNameMapping: Map<Sync.State, string> = new Map([
  [Sync.State.IN_PROGRESS, /* */'进行中'],
  [Sync.State.DONE, /*        */'完成'],
])

