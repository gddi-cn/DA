import { FormInstance } from 'antd'
import { Flow } from 'gddi-app-builder'
import { atom } from 'jotai'

export const openAtom = atom<boolean>(false)

export const currentStepAtom = atom<'base' | 'config'>('base')

export const creatingAtom = atom<boolean>(false)

export const baseFormAtom = atom<FormInstance<Template.Create.Form> | null>(null)

export const baseFormValueAtom = atom<Template.Create.Form | null>(null)

export const pipelineAtom = atom<Flow | undefined>(undefined)

