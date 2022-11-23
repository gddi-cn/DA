import { FormInstance  } from 'antd'
import { useAtom } from 'jotai'
import { dialogOpenAtom, selectedDeviceAtom, stepAtom } from '../store'
import { idAtom, versionIdAtom } from '@views/Deployment/BySDK/DeviceLicense/store'
import { ApplyModel } from '@src/shared/types/license'
import { LicenseType } from '@src/shared/enum/license'
import modelAPI from '@src/apis/model'
import { useReload } from '@views/Deployment/BySDK/DeviceLicense/components/LicenseList/hook'

export const useAction = (form: FormInstance<{ day: number, custom?: number }>) => {
  const [, setStep] = useAtom(stepAtom)
  const [id] = useAtom(idAtom)
  const [versionId] = useAtom(versionIdAtom)
  const [selectedDeviceId] = useAtom(selectedDeviceAtom)
  const [, setOpen] = useAtom(dialogOpenAtom)
  const reload = useReload()

  const handleCancel = () => {
    setStep('device')
  }

  const handleSubmit = async () => {
    if (!id || !versionId) return

    const { day, custom } = await form.validateFields()
    if (day === 0 && !custom) return

    const model: ApplyModel = {
      apply_type: LicenseType.SDK,
      device_ids: selectedDeviceId,
      request_days: day === 0 ? custom! : day
    }

    const { success } = await modelAPI.modelAuth(id, versionId, model)

    if (success) {
      setOpen(false)
      reload()
    }
  }

  return {
    handleCancel,
    handleSubmit,
  }
}