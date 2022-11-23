import { useAtom } from 'jotai'

import { dialogOpenAtom } from './store'
import { idAtom, versionIdAtom } from '../../store'
import { useReload } from '../LicenseList/hook'
import { Form, FormInstance, RadioChangeEvent } from 'antd'
import { ApplyModel } from '@src/shared/types/license'
import { LicenseType } from '@src/shared/enum/license'
import modelAPI from '@src/apis/model'

export const useApply = () => {
  const [open, setOpen] = useAtom(dialogOpenAtom)

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  return {
    open,
    openDialog,
    closeDialog,
  }
}

export const useAction = (form: FormInstance<{ day: number, custom?: number }>) => {
  const [id] = useAtom(idAtom)
  const [versionId] = useAtom(versionIdAtom)
  const [, setOpen] = useAtom(dialogOpenAtom)
  const reload = useReload()

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  const handleSubmit = async () => {
    if (!id || !versionId) return

    const { day, custom } = await form.validateFields()
    if (day === 0 && !custom) return

    const  request_days = day === 0 ? custom! : day
    
    const model: ApplyModel = {
      apply_type: LicenseType.CLOUD,
      request_days,
    }

    const { success } = await modelAPI.modelAuth(id, versionId, model)

    if (success) {
      reload()
      setOpen(false)
    }
  }

  return {
    handleCancel,
    handleSubmit,
  }
}
