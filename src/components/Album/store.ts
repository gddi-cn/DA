import { atom } from 'jotai'

export const displayTypeAtom = atom<Album.Props['type']>('grid')

export const dataListAtom = atom<Array<Album.ImgMeta>>([])
