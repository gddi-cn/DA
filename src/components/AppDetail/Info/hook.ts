import { useAtom } from 'jotai'
import moment from 'moment'

import { appAtom } from '../store'
import default_cover from '@src/asset/images/app/default_cover.png'
import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import { AppTemplateInput } from '@src/shared/enum/application'

export const useInfo = () => {
  const [app] = useAtom(appAtom)

  const {
    name,
    cover: _cover,
    template_name,
    input,
    adapter_device,
    create_time,
    update_time,
    description,
  } = app || {}

  const cover = _cover || default_cover
  const InputIcon = input === AppTemplateInput.IMAGE? ImgServerIcon : VideoServerIcon
  const inputTip = input === AppTemplateInput.IMAGE ? '图片服务' : '视频流服务'

  const created = create_time
    ? moment(new Date(create_time * 1000)).format('YYYY-MM-DD HH:mm:SS')
    : '--'

  const updated = update_time
    ? moment(new Date(update_time * 1000)).format('YYYY-MM-DD HH:mm:SS')
    : '--'

  return {
    name,
    cover,
    template_name,
    InputIcon,
    inputTip,
    adapter_device,
    created,
    updated,
    description,
  }
}
