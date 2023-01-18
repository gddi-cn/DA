import { atom } from 'jotai'

export const authUserInfoAtom = atom<User.Instance | null>(null)

export const fetchingUserInfo = atom<boolean>(false)