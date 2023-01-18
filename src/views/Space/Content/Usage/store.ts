import { atom } from 'jotai'
import { User as UserEnum } from '@src/shared/enum/user'

export const consumeTypeAtom = atom<UserEnum.Consume.Type>(UserEnum.Consume.Type.ALL)

export const pageAtom = atom<number>(1)

export const pageSizeAtom = atom<number>(10)

export const fetchingAtom = atom<boolean>(false)

export const totalAtom = atom<number>(0)

export const usageListAtom = atom<Array<User.Consume.Instance>>([])
