import { atom } from "jotai";

export const modelVersionIdAtom = atom<Model.Version['id'] | undefined>(undefined)
export const modelIdAtom = atom<string | undefined>(undefined)
