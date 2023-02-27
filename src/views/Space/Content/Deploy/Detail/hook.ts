import React from 'react'
import { useAtom } from "jotai"
import { currentAppIdAtom, currentPageAtom, currentSyncAtom, fetchingSyncAtom } from "../store"
import { Space } from '@src/views/Space/enums'
import { message } from 'antd'
import syncAPI from '@src/apis/sync'
import { formatUnixTime } from '@src/utils/tools'

import { ReactComponent as DeploySuccessIcon } from '@src/asset/icons/space/deploy_success.svg'
import { ReactComponent as DeployPendingIcon } from '@src/asset/icons/space/deploy_pending.svg'
import { ReactComponent as DeployFailIcon } from '@src/asset/icons/space/deploy_fail.svg'

const setSelected = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const $c = ref.current

  if (!$c) return

  $c.setAttribute('selected', '')
}

const removeSelected = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const $c = ref.current

  if (!$c) return

  $c.removeAttribute('selected')
}
export const useRefreshSync = () => {
  const [currentSync, setCurrentSync] = useAtom(currentSyncAtom)
  const [loading, setLoading] = useAtom(fetchingSyncAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  return async () => {
    if (loading) return

    if (!currentSync?.id) {
      message.warn('参数错误')
      setCurrentPage(Space.Deploy.Page.LIST)
      return
    }

    setLoading(true)
    const { success, data } = await syncAPI.detail(currentSync.id)
    setLoading(false)

    if (!success || !data) return

    setCurrentSync(data)
  }
}

export const useDetail = () => {
  const refresh = useRefreshSync()
  const [sync] = useAtom(currentSyncAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const allRef = React.useRef<HTMLDivElement | null>(null)
  const successRef = React.useRef<HTMLDivElement | null>(null)
  const pendingRef = React.useRef<HTMLDivElement | null>(null)
  const failRef = React.useRef<HTMLDivElement | null>(null)
  const [currentState, setCurrentState] =
    React.useState<Sync.Instance['sync_state'] | 'All'>('All')

  const {
    create_time,
    total,
    pending_count,
    success_count,
    failed_count,
    devices,
  } = sync || {}

  React.useEffect(
    () => {
      refresh()   
    },
    []
  )


  const handleClick = (state: Sync.Instance['sync_state'] | 'All') => {
    if (state === currentState) return
    setCurrentState(state)
  }

  const deviceList = currentState === 'All'
    ? devices || []
    : (devices || []).filter(d => {
      return  d.sync_state === (currentState as Sync.Instance['sync_state'])
    })

  if (currentState === 'Failure') {
    deviceList.forEach(device => {
      device.syncs = device.syncs.filter(s => s.sync_state === 'Failure')
    })
  }

  const handleClose = () => {
    setCurrentPage(Space.Deploy.Page.LIST)
  }

  React.useEffect(
    () => {
      switch(currentState) {
        case 'All':
          setSelected(allRef)
          removeSelected(successRef)
          removeSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'Done':
          removeSelected(allRef)
          setSelected(successRef)
          removeSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'InProgress':
          removeSelected(allRef)
          removeSelected(successRef)
          setSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'Failure':
          removeSelected(allRef)
          removeSelected(successRef)
          removeSelected(pendingRef)
          setSelected(failRef)
          break
        default:
          break
      }
    },
    [currentState]
  )

  return {
    created: create_time ? formatUnixTime(create_time) : '--',
    total,
    pending_count,
    success_count,
    failed_count,
    allRef,
    successRef,
    pendingRef,
    failRef,
    handleClick,
    deviceList,
    handleClose,
  }
}

export const useDevice = () => {

}

export const useSyncItem = (sync: Device.Sync) => {
  const { app_name, sync_state, app_id, deleted } = sync || {}

  const [, setCurrentAppId] = useAtom(currentAppIdAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const Icon = React.useMemo(() => {
    switch(sync_state) {
      case 'Done':
       return DeploySuccessIcon
      case 'InProgress':
        return DeployPendingIcon
      default:
        return DeployFailIcon
    }
  }, [sync_state])

  const handleClick = () => {
    if (!app_id || deleted) return
    setCurrentAppId(app_id)
    setCurrentPage(Space.Deploy.Page.APP_DETAIL)
  }

  return {
    Icon,
    name: app_name || '--',
    handleClick,
    disabled: deleted,
  }
}
