import apiAPI from "@src/apis/api"
import { formatUnixTime } from "@src/utils/tools"
import { Form, message } from "antd"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import React from "react"
import { apiListAtom, createDialogOpenAtom, currentDeleteItemAtom, deleteDialogOpenAtom, deletingAtom, fetchingAtom, paramsAtom, totalAtom, useResetStore } from "./store"

const useRefreshList = () => {
  const setLoading = useSetAtom(fetchingAtom)
  const params = useAtomValue(paramsAtom)
  const setTotal = useSetAtom(totalAtom)
  const setApi = useSetAtom(apiListAtom)

  return async () => {
    setLoading(true)
    const { success, data } = await apiAPI.list(params)
    setLoading(false)

    if (!success || !data) return

    const { total, items } = data

    setTotal(total ?? 0)
    setApi(items ?? [])
  }
}

const useOpenCreateDialog = () => {
  const setCreateDialogOpen = useSetAtom(createDialogOpenAtom)

  return () => {
    setCreateDialogOpen(true)
  }
}

export const useItemCreator = () => {
  const [open, setOpen] = useAtom(createDialogOpenAtom)
  const [loading, setLoading] = useAtom(fetchingAtom)
  const refresh = useRefreshList()
  const [form] = Form.useForm<{ name: string }>()

  const handleCancel = () => {
    loading || setOpen(false)
  }

  const handleCreate = async () => {
    const { name } = await form.validateFields()

    if (!name) return

    setLoading(true)
    const { success } = await apiAPI.create({ name })
    setLoading(false)

    refresh()

    if (!success) return

    message.success('创建成功')

    setOpen(false)
  }

  React.useEffect(
    () => {
      open || form.resetFields()
    },
    [open]
  )

  return {
    open,
    loading,
    form,
    handleCancel,
    handleCreate,
  }
}

const useOpenDeleteDialog = () => {
  const setDeleteDialogOpen = useSetAtom(deleteDialogOpenAtom)
  const setCurrentItem = useSetAtom(currentDeleteItemAtom)

  return (item: API.Instance) => {
    setCurrentItem(item)
    setTimeout(() => setDeleteDialogOpen(true))
  }
}

export const useItemDeleter = () => {
  const [open, setOpen] = useAtom(deleteDialogOpenAtom)
  const [loading, setLoading] = useAtom(deletingAtom)
  const [item, setItem] = useAtom(currentDeleteItemAtom)

  const refresh = useRefreshList()

  const handleClose = () => {
    loading || setOpen(false)
  }

  const handleDelete = async () => {
    if (!item?.id) return

    setLoading(true)
    const { success } = await apiAPI.delete(item.id)
    setLoading(false)

    refresh()

    if (!success) return

    message.success('删除成功')

    setOpen(false)
  }

  React.useEffect(
    () => {
      open || setItem(null)
    },
    [open]
  )

  return {
    open,
    loading,
    handleClose,
    handleDelete,
  }
}

export const useApiItem = (api: API.Instance) => {
  const { name, secret_key, access_id, created } = api

  const date = formatUnixTime(created)

  const openDeleteDialog = useOpenDeleteDialog()

  const handleDeleteClick = () => {
    openDeleteDialog(api)
  }


  return {
    name,
    access_id,
    secret_key,
    date,
    handleDeleteClick,
  }
}

export const useList = () => {
  const total = useAtomValue(totalAtom)
  const apiList = useAtomValue(apiListAtom)
  const [params, setParams] = useAtom(paramsAtom)
  const { page, page_size: pageSize } = params

  const handleChange = (page: number, pageSize: number) => {
    setParams({ ...params, page, page_size: pageSize })
  }

  return {
    total,
    apiList,
    page,
    pageSize,
    handleChange,
  }
}

export const useCreateBtn = () => {
  const openCreateDialog = useOpenCreateDialog()

  const handleClick = () => {
    openCreateDialog()
  }

  return {
    handleClick,
  }
}


export const useApi = () => {
  useResetStore()

  const refreshList = useRefreshList()
  const searchParams = useAtomValue(paramsAtom)
  const loading = useAtomValue(fetchingAtom)
  const total = useAtomValue(totalAtom)

  React.useEffect(
    () => {
      console.log({ searchParams })
      refreshList()
    },
    [searchParams]
  )

  return {
    loading,
    empty: total === 0,
  }
}
