import { atom } from 'jotai'
import { Model as IModel } from '@src/shared/enum/model'

export const currentVersionIdAtom = atom<Model.Version['id'] | undefined>(undefined)

export const versionListAtom = atom<Array<Model.Version>>([])

export const fetchingVersionList = atom<boolean>(false)

export const currentVersionStatusAtom = atom<IModel.TrainStatus | undefined>((get) => {
  const versionList = get(versionListAtom)
  const currentId = get(currentVersionIdAtom)

  const idx = versionList.findIndex(x => x.id === currentId)

  if (idx < 0) return undefined

  return versionList[idx].status
})

