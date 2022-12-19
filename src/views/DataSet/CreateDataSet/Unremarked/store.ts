import { atom } from 'jotai'
import { FormInstance } from "antd";

export const baseFormAtom = atom<FormInstance<Unremarked.Form.Base> | undefined>(undefined)

export const requirementAtom = atom<FormInstance<Unremarked.Form.Requirement> | undefined>(undefined)

export const stepAtom = atom<'base' | 'requirement'>('base')

export const taskIdAtom = atom<string | null>(null)

export const baseFormDataAtom = atom<Unremarked.Form.Base | undefined>(undefined)

export const createLoadingAtom = atom<boolean>(false)

