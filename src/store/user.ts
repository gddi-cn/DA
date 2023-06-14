import { atom } from 'jotai'
import { atomWithStorage, atomWithDefault } from 'jotai/utils'
import userAPI from '@src/apis/user'

export const userTokenAtom = atomWithStorage<string | null>('token', localStorage.getItem('token'))

export const authUserInfoAtom = atom<User.Instance | null>(null)

export const fetchingUserInfo = atom<boolean>(false)

export const currentUserAtom = atomWithDefault<Promise<User.Instance | null>>(async (get) => {
  const token = get(userTokenAtom)
  if (!token) return null

  const { success, data } = await userAPI.detail()
  if (!success || !data) return null

  return data
})

export const userUsageAtom = atom<Promise<User.Usage | null>>(async (get) => {
  const token = get(userTokenAtom)
  if (!token) return null

  const { success, data } = await userAPI.usage()
  if (!success || !data) return null

  return data
})

export const refreshUserAtom = atom(null, async (_get, set) => {

  const { success, data } = await userAPI.detail()
  if (!success || !data) {
    set(currentUserAtom, Promise.resolve(null))
    return
  }
  set(currentUserAtom, Promise.resolve(data))
})

