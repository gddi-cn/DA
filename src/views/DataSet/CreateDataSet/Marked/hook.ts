import { useAtomValue } from "jotai"
import { uploaderRefAtom, uploadingAtom } from "./store"
import { useBack2DatasetIndex } from "@src/hooks/task"
import React from "react"
import { Modal, message } from "antd"

export const useCancelUpload = (): [boolean, () => void] => {
  const uploaderRef = useAtomValue(uploaderRefAtom)
  const uploading = useAtomValue(uploadingAtom)
  const handleBack = useBack2DatasetIndex()
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleCancel = (back = false) => {
    if (!uploading) {
      back && handleBack()
      return
    }

    const uploader = uploaderRef?.current
    if (loading || !uploader) return

    Modal.confirm({
      title: '取消创建数据集',
      content: '数据集正在上传，确定要取消吗',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          setLoading(true)
          const res = await uploader.cansel()
          if (res) {
            message.success('取消上传')
          }
          back && handleBack()
        } catch (e) {
          console.error(e)
        } finally {
          setLoading(false)
        }
      },
    })

  }

  return [loading, handleCancel]
}
