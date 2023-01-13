import { atom } from 'jotai'

export const authUserInfoAtom = atom<User.Instance | null>(null)
