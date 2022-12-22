import React from "react";
import {useAtom} from "jotai";

import { orderDetailAtom } from '../store'
import {OrderStatus} from "@src/shared/enum/order";
import {message, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {APP_DATASET_DETAIL} from "@router";
import {useHeader} from "@src/hooks/header";

export const useFooter = () => {
  const [order] = useAtom(orderDetailAtom)
  const { status } = order || { }

  const { deleteCurrentProject, updateCurrentProjectStatus } = useHeader()

  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)

  const showDelete = status === OrderStatus.ABROGATION

  const showFinish = status === OrderStatus.FINISHED

  const showFooter = showDelete || showFinish

  const handleDelete = async () => {
    if (status !== OrderStatus.ABROGATION) return

    Modal.confirm({
      title: '删除任务',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，是否确定删除？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        setDeleteLoading(true)

        const success = await deleteCurrentProject()

        setDeleteLoading(false)

        if (!success) return

        message.success('删除成功')
      },
    });
  }

  const handleFinish = () => {
    updateCurrentProjectStatus(APP_DATASET_DETAIL)
  }

  return {
    showDelete,
    showFinish,
    showFooter,
    handleDelete,
    handleFinish,
    deleteLoading,
  }
}
