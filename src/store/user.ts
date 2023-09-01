import { atom } from 'jotai'
import { atomWithStorage, atomWithDefault } from 'jotai/utils'
import userAPI from '@src/apis/user'
import {atomWithRefresh} from "@src/utils/atomCreators";

export const userTokenAtom = atomWithStorage<string | null>('token', localStorage.getItem('token'))

export const authUserInfoAtom = atom<User.Instance | null>(null)

export const fetchingUserInfo = atom<boolean>(false)

export const currentUserAtom = atomWithRefresh<Promise<User.Instance | null>>(async (get) => {
  const token = get(userTokenAtom)
  if (!token) return null

  const { success, data } = await userAPI.detail()
  if (!success || !data) return null

  return data
})

export const userUsageAtom = atomWithRefresh<Promise<User.Usage | null>>(async (get) => {
  const token = get(userTokenAtom)
  if (!token) return null

  const { success, data } = await userAPI.usage()
  if (!success || !data) return null

  return data
})
