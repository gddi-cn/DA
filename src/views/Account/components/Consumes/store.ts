import { atom } from 'jotai'

import { User as EUser } from "@src/shared/enum/user";
import userAPI from '@src/apis/user';

export const filterAtom = atom<User.Consume.List.Params>({
  page: 1,
  page_size: 10,
  consume_type: EUser.Consume.Type.ALL,
})

export const consumeTypeAtom = atom<EUser.Consume.Type>(get =>
  get(filterAtom).consume_type || EUser.Consume.Type.ALL
)

export const pageAtom = atom<number>(get => get(filterAtom).page)

export const pageNumberAtom = atom<number>(get => get(filterAtom).page_size)

export const consumesAtom = atom(async (get) => {
  const filter = get(filterAtom)
  const { success, data } = await userAPI.consumes(filter)
  if (!success || !data) return {
    total: 0,
    items: []
  }

  return {
    total: data.total ?? 0,
    items: data.items ?? [],
  }
})

