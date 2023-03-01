import { atom } from "jotai";

import { AppTemplateInput } from '@src/shared/enum/application'
import React from "react";

export const fetchingTemplateAtom = atom<boolean>(false)

export const templateListAtom = atom<Array<App.Template.Instance>>([])

export const selectedTemplateAtom = atom<App.Template.Instance | undefined>(undefined)

// filter
export const nameAtom = atom<App.Template.Instance['name'] | undefined>(undefined)

export const labelOptionAtom =
  atom<{ key: string, value: string, label: string } | null>(null)

export const inputOptionAtom = 
  atom<{ key: string, value: AppTemplateInput, label: string } | undefined> (undefined)

// filter option list
export const labelListAtom = atom<Array<string>>([])

export const handleChangeFnRefAtom = atom<
  React.MutableRefObject<((selected: App.Template.Instance | null) => void) | undefined>
  | undefined
>(undefined)

