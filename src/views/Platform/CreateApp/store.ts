import { FormInstance } from "antd";
import { atom } from "jotai";

export const stepAtom = atom<'base' | 'template'>('base')

export const baseFormAtom = atom<FormInstance<App.CreateForm> | null> (null)

export const baseFormValueAtom = atom<App.CreateForm | null> (null)

export const selectedTemplateAtom = atom<App.Template.Instance | null>(null)

export const creatingAppAtom = atom<boolean>(false)

