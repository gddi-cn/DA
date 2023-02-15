import React from 'react'
import { useAtom } from 'jotai'
import moment from 'moment'

import { appAtom, deployRecordListAtom } from '../store'
import default_cover from '@src/asset/images/app/default_cover.png'
import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import { AppTemplateInput } from '@src/shared/enum/application'
import { Form, message } from 'antd'
import appAPI from '@src/apis/app'
import { useRefresh } from '../hook'

export const useHeader = () => {
  const [app] = useAtom(appAtom)

  const {
    name,
  } = app || {}

  return {
    name,
  }
}

export const useMeta = () => {
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

export const useEdit = () => {
  const [form] = Form.useForm<Pick<App.Instance, 'name' | 'description'>>()
  const [app] = useAtom(appAtom)
  const { name, description, id } = app || {}

  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const refresh = useRefresh()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    if (loading) return
    setOpen(false)
  }

  const handleUpdate = async () => {
    if (loading || !id) return
    const data = await form.validateFields()

    setLoading(true)
    const { success } = await appAPI.update(id, data)
    setLoading(false)

    refresh(id)

    if (!success) return

    message.success('修改成功')
    setOpen(false)
  }

  React.useEffect(
    () => {
      if (open) {
        form.setFieldsValue({
          name: name || '',
          description: description || ''
        })
      } else {
        form.resetFields()
      }
    },
    [open]
  )

  return {
    form,
    open,
    handleOpen,
    handleCancel,
    handleUpdate,
    loading,
  }
}


export const useConfig = () => {
  const [app] = useAtom(appAtom)

  const modelList = app?.models || []

  return {
    modelList,
  }
}

export const useDeploy = () => {
  const [recordList] = useAtom(deployRecordListAtom)

  return {
    recordList,
  }
}
