import { atom } from 'jotai'
import { Space } from './enums'

export const currentPageAtom = atom<Space.Page>(Space.Page.USAGE)

