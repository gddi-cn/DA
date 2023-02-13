import { atom } from 'jotai'

import { Space } from '@src/views/Space/enums'
import { AppTemplateInput } from '@src/shared/enum/application'

export const currentStepAtom = atom<Space.App.Create.Step>(Space.App.Create.Step.META)

export const metaFormValueAtom = atom<App.CreateForm | null>(null)

export const fetchingTemplateListAtom = atom<boolean>(false)

export const templateListAtom = atom<Array<App.Template.Instance>>([])

export const templateListTotalAtom = atom<number>(0)

export const templateNameFilterAtom = atom<string | undefined>(undefined)

export const templateLabelFilterAtom =
  atom<{ key: string, value: string, label: string } | null>(null)

export const templateInputFilterAtom = atom<AppTemplateInput | undefined>(undefined)

export const selectedTemplateAtom = atom<App.Template.Instance | null>(null)
