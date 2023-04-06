import { atom } from "jotai";

export const channelRestAtom = atom<number>(0)
export const channelTotalAtom = atom<number>(0)
export const channelAtom = atom<number>(get => get(channelTotalAtom) - get(channelRestAtom))

export const modelRestAtom = atom<number>(0)
export const modelTotalAtom = atom<number>(0)
export const modelAtom = atom<number>(get => get(modelTotalAtom) - get(modelRestAtom))

export const deviceRestAtom = atom<number>(0)
export const deviceTotalAtom = atom<number>(0)
export const deviceAtom = atom<number>(get => get(deviceTotalAtom) - get(deviceRestAtom))

export const onlineDeviceRestAtom = atom<number>(0)
export const onlineDeviceTotalAtom = atom<number>(0)
export const onlineDeviceAtom = atom<number>(get => get(onlineDeviceTotalAtom) - get(onlineDeviceRestAtom))

export const expireAtom = atom<number>(0)

export const loadingAtom = atom<boolean>(false)
