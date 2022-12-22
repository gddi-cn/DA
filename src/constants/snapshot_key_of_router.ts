import * as ALL_PATHS from '@router/pathNames'

export type TYPE_OF_ALL_PATHS = typeof ALL_PATHS

export type KEYS_OF_ALL_PATHS = keyof TYPE_OF_ALL_PATHS

type SKOR = {
  [index in KEYS_OF_ALL_PATHS]: any
}

const _SNAPSHOT_KEY_OF_ROUTER: any = {}

for (const [k] of Object.entries(ALL_PATHS)) {
  _SNAPSHOT_KEY_OF_ROUTER[k] = k
}

export const SNAPSHOT_KEY_OF_ROUTER: Partial<SKOR> = _SNAPSHOT_KEY_OF_ROUTER
