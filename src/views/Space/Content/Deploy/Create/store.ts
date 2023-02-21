import { atom } from 'jotai'

import { Space } from '@src/views/Space/enums'

export const stepAtom = atom<Space.Deploy.Create.Step>(Space.Deploy.Create.Step.DEVICE_TYPE)

export const deviceTypeAtom = atom<Device.Chip.Option | undefined>(undefined)
