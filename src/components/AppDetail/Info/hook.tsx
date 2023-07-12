import React from 'react'
import { useAtom } from 'jotai'
import moment from 'moment'
import {ExclamationCircleOutlined} from "@ant-design/icons";

import { appAtom, currentPageAtom, currentRecordAtom, deployRecordListAtom, onCloseRefAtom, onDeleteRefAtom } from '../store'
import default_cover from '@src/asset/images/app/default_cover.png'
import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import { AppTemplateInput } from '@src/shared/enum/application'
import { Form, message, Modal } from 'antd'
import appAPI from '@src/apis/app'
import { useRefresh } from '../hook'
import { AppDetail } from '../enums';
import s3API from '@src/apis/s3';

export const useHeader = () => {
  const [app] = useAtom(appAtom)

  const {
    id,
    name,
  } = app || {}

  return {
    id,
    name,
  }
}

export const useMeta = () => {
  const [app] = useAtom(appAtom)
  const [loading, setLoading] = React.useState<boolean>(false)

  const refresh = useRefresh()

  const {
    id,
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

  const handleCoverChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!id) return
    if (loading) {
      e.target.value = ''
      return
    }

    const file = e.target.files && e.target.files[0]

    e.target.value = ''

    if (!file) return

    const { name } = file

    if (!/.(jpg|jpeg|png)$/.test(name.toLowerCase())) {
      message.warn('不支持该类型文件')
      return
    }

    setLoading(true)
    const { success, data } = await s3API.uploadRawFile(file)

    if (success && data) {
      const { success } = await appAPI.update(id, { cover: data })
      refresh(id)
      success && message.success('修改成功')
    }
    setLoading(false)
  }

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
    handleCoverChange,
    loading,
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

export const useMore = () => {
  const [app] = useAtom(appAtom)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [onDeleteRef] = useAtom(onDeleteRefAtom)

  const { id } = app || {}
  const refresh = useRefresh()

  const handleCopy = async () => {
    if (!id || loading) return
    setLoading(true)
    const { success } = await appAPI.copy(id)
    setLoading(false)

    if (!success) return

    message.success('复制成功')
  }

  const handleDelete = async () => {
    if (!id || loading) return

    Modal.confirm({
      title: '删除应用',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，是否确定删除？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        setLoading(true)
        const { success } = await appAPI.delete(id)
        setLoading(false)

        if (!success) {
          refresh(id)
          return
        }

        const onDelete = onDeleteRef?.current
        console.log({ onDelete })
        onDelete && onDelete()

        message.success('删除成功')
      },
    })
  }

  return {
    handleCopy,
    handleDelete,
    loading,
  }
}

export const useConfig = () => {
  const [app] = useAtom(appAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const modelList = app?.models || []

  const handleConfig = () => {
    setCurrentPage(AppDetail.Page.CONFIG)
  }


  return {
    modelList,
    handleConfig,
  }
}

export const useDeploy = () => {
  const [recordList] = useAtom(deployRecordListAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setCurrentRecord] = useAtom(currentRecordAtom)

  const handleClick = async (record: Sync.Instance) => {
    setCurrentRecord(record)
    setCurrentPage(AppDetail.Page.DEPLOY)
  }

  return {
    recordList,
    handleClick,
  }
}

export const useInfo = () => {
  const [onCloseRef] = useAtom(onCloseRefAtom)

  const handleClose = () => {
    const onClose = onCloseRef?.current

    onClose && onClose()
  }

  return {
    handleClose,
  }
}

