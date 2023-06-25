import { FormInstance } from "antd";
import { atom, useAtomValue, useSetAtom } from "jotai";

export const stepAtom = atom<'base' | 'template'>('base')

export const baseFormAtom = atom<FormInstance<App.CreateForm> | null>(null)

export const baseFormValueAtom = atom<App.CreateForm | null>(null)

export const selectedTemplateAtom = atom<App.Template.Instance | null>(null)

export const creatingAppAtom = atom<boolean>(false)

export const useCancel = (onCancel?: () => void) => {
  const setStep = useSetAtom(stepAtom)
  const form = useAtomValue(baseFormAtom)
  const setFormValue = useSetAtom(baseFormValueAtom)
  const setSelectedTemplate = useSetAtom(selectedTemplateAtom)
  const setLoading = useSetAtom(creatingAppAtom)

  return () => {
    form?.resetFields()
    setFormValue(null)
    setStep('base')
    setSelectedTemplate(null)
    setLoading(false)
    onCancel?.()
  }
}
