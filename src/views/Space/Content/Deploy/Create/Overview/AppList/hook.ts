import { useAtom } from 'jotai'

import default_cover from '@src/asset/images/app/default_cover.png'
import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'

import { selectedAppListAtom } from '../../store'
import { AppTemplateInput } from '@src/shared/enum/application'

export const useAppList = () => {
  const [appList] = useAtom(selectedAppListAtom)

  return {
    appList,
  }
}

export const useAppItem = (app: App.Instance) => {
  const {
    cover, name, id,
    template_name, input,
    adapter_device,
  } = app

  const [, setAppList] = useAtom(selectedAppListAtom)
  const InputIcon = input === AppTemplateInput.IMAGE? ImgServerIcon : VideoServerIcon
  const inputTip = input === AppTemplateInput.IMAGE ? '图片服务' : '视频流服务'

  const handleRemove = () => {
    setAppList(x => x.filter(x => x.id !== id))
  }

  return {
    cover: cover || default_cover,
    name,
    template_name,
    adapter_device,
    InputIcon,
    inputTip,
    handleRemove,
  }
}

