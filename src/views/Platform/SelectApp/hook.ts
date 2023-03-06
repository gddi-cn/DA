import React from 'react'
import { useAtom } from 'jotai'
import { message, Modal } from 'antd'

import {
  appListAtom,
  createAppOpenAtom,
  deviceTypeListAtom, fetchingAppListAtom,
  selectDeviceTypeAtom,
  selectedAppAtom
} from '../store'
import appAPI from '@src/apis/app'
import { useRefreshAppList, useRefreshDeviceTypeList } from '@views/Platform/hook'
import { currentVersionIdAtom } from '@src/components/ModelVersionSelector/store'

export const useSelectApp = () => {
  const [appList] = useAtom(appListAtom)
  const [modelVersionId] = useAtom(currentVersionIdAtom)
  const [selectDeviceType] = useAtom(selectDeviceTypeAtom)
  const [loading] = useAtom(fetchingAppListAtom)

  const showList = appList.length > 0

  const refreshAppList = useRefreshAppList()
  const refreshDeviceTypeList = useRefreshDeviceTypeList()

  React.useEffect(
    () => {
      refreshAppList()
      refreshDeviceTypeList()
    },
    [modelVersionId, selectDeviceType]
  )

  return {
    showList,
    loading,
  }
}


export const useSidebar = () => {
  const [deviceTypeList] = useAtom(deviceTypeListAtom)
  const [, setSelectedDeviceType] = useAtom(selectDeviceTypeAtom)
  const [, setOpen] = useAtom(createAppOpenAtom)

  const options = deviceTypeList.map(t => ({ key: t.key, label: t.name, value: t.key }))

  const handleChange = (chipId?: Device.Chip.Instance['key']) => {
    if (!chipId) {
      setSelectedDeviceType(null)
      return
    }

    const [chip] = deviceTypeList.filter(x => x.key === chipId)

    setSelectedDeviceType(chip || null)
  }

  const handleClick = () => {
    setOpen(true)
  }

  return {
    handleChange,
    options,
    handleClick,
  }
}

export const useAppList = () => {
  const [appList] = useAtom(appListAtom)

  return {
    appList
  }
}

export const useAppItem = (instance: App.Instance) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [selectedApp, setSelectedApp] = useAtom(selectedAppAtom)
  const selected = selectedApp?.id === instance.id

  const [deleting, setDeleting] = React.useState<boolean>(false)

  const refresh = useRefreshAppList()


  const handleClick = () => {
    setSelectedApp(selected ? undefined : instance)
  }

  const handleDelete = async (e: any) => {
    e?.domEvent?.stopPropagation()
    e?.domEvent?.preventDefault()

    const { id } = instance || {}
    if (!id) return

    if (deleting) return

    Modal.confirm({
      title: '删除应用',
      content: '确定要删除该应用吗？',
      okText: '删除',
      cancelText: '取消',
      onOk: async () => {
        setDeleting(true)
        const { success } = await appAPI.delete(id) 
        setDeleting(false)

        if (success) {
          message.success('删除成功')
        }

        if (selected) {
          setSelectedApp(undefined)
        }

        await refresh()
      }
    })
  }

  React.useEffect(
    () => {
      const $c = containerRef.current
      if (!$c) return

      if (selected) {
        $c.setAttribute('selected', '')
      } else {
        $c.removeAttribute('selected')
      }
    },
    [selected]
  )

  return {
    containerRef,
    handleClick,
    handleDelete,
  }
}
