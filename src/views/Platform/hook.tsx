import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAtom } from 'jotai'

import { APP_SELECT_DEPLOY_TYPE } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { RootState } from '@reducer'
import {
  appListAtom,
  createAppOpenAtom,
  currentStepAtom,
  deviceTypeListAtom,
  expireAtom,
  fetchingAppListAtom,
  fetchingDeviceTypeListAtom, limitAtom,
  modelVersionIdAtom,
  selectDeviceTypeAtom,
  selectedAppAtom,
  selectedDeviceGroupAtom,
  selectedDeviceIdListAtom,
  syncTypeAtom
} from './store'
import { Platform } from '@views/Platform/enum'
import appAPI from '@src/apis/app'
import deviceAPI from '@src/apis/device'
import { DeviceType } from '@src/shared/enum/device'
import http from '@src/utils/http'
import { ModuleDefinitions, Pipeline } from 'gddi-app-canvas'
import { currentVersionIdAtom } from '@src/components/ModelVersionSelector/store'

import { ReactComponent as TemplateActiveIcon } from '@src/asset/icons/platform/template_active.svg'
import { ReactComponent as NextIcon } from '@src/asset/icons/platform/next.svg'
import { ReactComponent as NextActiveIcon } from '@src/asset/icons/platform/next_active.svg'
import { ReactComponent as ConfigIcon } from '@src/asset/icons/platform/config.svg'
import { ReactComponent as ConfigActiveIcon } from '@src/asset/icons/platform/config_active.svg'
import { ReactComponent as DeviceIcon } from '@src/asset/icons/platform/device.svg'
import { ReactComponent as DeviceActiveIcon } from '@src/asset/icons/platform/device_active.svg'
import { ReactComponent as SyncIcon } from '@src/asset/icons/platform/sync.svg'
import { ReactComponent as SyncActiveIcon } from '@src/asset/icons/platform/sync_active.svg'

const setActive = (ref: React.MutableRefObject<HTMLDivElement | null>) =>
  ref.current?.setAttribute('active', '')

const setInactive = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  ref.current?.removeAttribute('active')
}

export const useRefreshAppList = () => {
  const [model_iter_id] = useAtom(modelVersionIdAtom)
  const [selectDeviceType] = useAtom(selectDeviceTypeAtom)
  const [loading, setLoading] = useAtom(fetchingAppListAtom)
  const [, setAppList] = useAtom(appListAtom)
  const [, setSelectedApp] = useAtom(selectedAppAtom)

  return async () => {
    if (loading || !model_iter_id) return

    const device = selectDeviceType?.key

    setLoading(true)

    const { success, data } = await appAPI.list({
      page: 1,
      page_size: 999,
      device,
      model_iter_id,
    })

    setLoading(false)

    setSelectedApp(undefined)

    if (!success || !data?.items) {
      setAppList([])
      return
    }

    setAppList(data.items || [])
  }
}

export const useRefreshDeviceTypeList = () => {
  const [model_iter_id] = useAtom(modelVersionIdAtom)
  const [loading, setLoading] = useAtom(fetchingDeviceTypeListAtom)
  const [, setDeviceTypeList] = useAtom(deviceTypeListAtom)

  return async () => {
    if (!model_iter_id || loading) return

    setLoading(true)

    const { success, data } = await deviceAPI.chipTypeList({
      page: 1,
      page_size: 999,
      model_iter_id,
      type: DeviceType.EDGE,
    })

    setLoading(false)

    if (!success || !data?.items) {
      setDeviceTypeList([])
      return
    }

    setDeviceTypeList(data.items || [])
  }
}

export const usePlatform = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const [, setModelVersionId] = useAtom(modelVersionIdAtom)
  const [, setSelectDeviceType] = useAtom(selectDeviceTypeAtom)
  const [, setDeviceTypeList] = useAtom(deviceTypeListAtom)
  const [, setFetchingAppList] = useAtom(fetchingAppListAtom)
  const [, setAppList] = useAtom(appListAtom)
  const [, setCreateAppOpen] = useAtom(createAppOpenAtom)
  const [, setFetchingDeviceTypeList] = useAtom(fetchingDeviceTypeListAtom)
  const [, setSelectedApp] = useAtom(selectedAppAtom)
  const [, setSelectedDeviceGroup] = useAtom(selectedDeviceGroupAtom)
  const [, setExpire] = useAtom(expireAtom)
  const [, setLimit] = useAtom(limitAtom)
  const [, setSyncType] = useAtom(syncTypeAtom)
  const [, setSelectedDeviceList] = useAtom(selectedDeviceIdListAtom)

  const [modelVersionId] =
    useAtom(currentVersionIdAtom)

  const showSelectApp = currentStep === Platform.Step.SELECT_APP
  const showConfig = currentStep === Platform.Step.CONFIG
  const showSelectDevice = currentStep === Platform.Step.SELECT_DEVICE
  const showSync = currentStep === Platform.Step.SYNC
  const showContent = currentStep !== Platform.Step.NOTIFY

  const resetStore = () => {
    setFetchingAppList(true)
    setFetchingDeviceTypeList(true)
    setCurrentStep(Platform.Step.SELECT_APP)
    setModelVersionId(undefined)
    setSelectDeviceType(null)
    setDeviceTypeList([])
    setAppList([])
    setCreateAppOpen(false)
    setSelectedApp(undefined)
    setSelectedDeviceGroup(null)
    setExpire(-1)
    setLimit(-1)
    setSyncType('sync')
    setSelectedDeviceList([])
    setFetchingDeviceTypeList(false)
    setFetchingAppList(false)
  }

  React.useEffect(
    () => {
      return resetStore
    },
    []
  )

  React.useEffect(
    () => {
      setModelVersionId(modelVersionId || undefined)
    },
    [modelVersionId]
  )

  return {
    showSelectApp,
    showConfig,
    showSelectDevice,
    showSync,
    showContent,
  }
}

export const useStep = () => {
  const selectAppRef = React.useRef<HTMLDivElement | null>(null)
  const configRef = React.useRef<HTMLDivElement | null>(null)
  const selectDeviceRef = React.useRef<HTMLDivElement | null>(null)
  const syncRef = React.useRef<HTMLDivElement | null>(null)

  const [currentStep] = useAtom(currentStepAtom)

  const templateIcon = <TemplateActiveIcon />
  const configIcon = currentStep >= Platform.Step.CONFIG ? <ConfigActiveIcon /> : <ConfigIcon />
  const deviceIcon = currentStep >= Platform.Step.SELECT_DEVICE ? <DeviceActiveIcon /> : <DeviceIcon />
  const syncIcon = currentStep >= Platform.Step.SYNC ? <SyncActiveIcon /> : <SyncIcon />
  const firstNextIcon = currentStep >= Platform.Step.CONFIG ? <NextActiveIcon /> : <NextIcon />
  const secondNextIcon = currentStep >= Platform.Step.SELECT_DEVICE ? <NextActiveIcon /> : <NextIcon />
  const thirdNextIcon = currentStep >= Platform.Step.SYNC ? <NextActiveIcon /> : <NextIcon />
  

  React.useEffect(
    () => {
      switch (currentStep) {
        case Platform.Step.SELECT_APP:
          setActive(selectAppRef)
          setInactive(configRef)
          setInactive(selectDeviceRef)
          setInactive(syncRef)
          break
        case Platform.Step.CONFIG:
          setActive(selectAppRef)
          setActive(configRef)
          setInactive(selectDeviceRef)
          setInactive(syncRef)
          break
        case Platform.Step.SELECT_DEVICE:
          setActive(selectAppRef)
          setActive(configRef)
          setActive(selectDeviceRef)
          setInactive(syncRef)
          break
        case Platform.Step.SYNC:
          setActive(selectAppRef)
          setActive(configRef)
          setActive(selectDeviceRef)
          setActive(syncRef)
          break
        default:
          break
      }
    },
    [currentStep]
  )

  return {
    selectAppRef,
    configRef,
    selectDeviceRef,
    syncRef,
    templateIcon,
    configIcon,
    deviceIcon,
    syncIcon,
    firstNextIcon,
    secondNextIcon,
    thirdNextIcon,
  }
}

export const useFooter = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const [syncType] = useAtom(syncTypeAtom)
  const [expire_seconds] = useAtom(expireAtom)
  const [limit] = useAtom(limitAtom)
  const [selectedApp] = useAtom(selectedAppAtom)
  const [selectedDeviceIdList] = useAtom(selectedDeviceIdListAtom)
  const [deploying, setDeploying] = React.useState<boolean>(false)

  const navigate = useNavigate()

  const nextLabel = currentStep === Platform.Step.SYNC
    ? (syncType === 'sync' ? '下发部署' : '导出')
    : '下一步'

  const disabledNext =
    (currentStep === Platform.Step.SELECT_APP && !selectedApp)
  || (currentStep === Platform.Step.SELECT_DEVICE && !selectedDeviceIdList.length)

  const loading =
    (currentStep === Platform.Step.SYNC && deploying)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const handleCancel = () => {
    navigate({
      pathname: APP_SELECT_DEPLOY_TYPE,
    })
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE
      }
    )
  }

  const handleDeploy = async () => {
    if (!selectedDeviceIdList?.length) return
    if (!selectedApp?.id) return

    let success = false

    setDeploying(true)
    if (syncType === 'sync') {
      const res = await appAPI.sync(
        selectedApp.id,
        {
          device_ids: selectedDeviceIdList,
          expire_seconds,
          limit,
        }
      )

      success = res.success
    }
    if (syncType === 'export') {
      const res = await appAPI.export(
        selectedApp.id,
        {
          device_ids: selectedDeviceIdList,
          expire_seconds,
          limit,
        },
        (selectedApp.name || 'app') +'.gem'
      )

      success = res.success
    }
    setDeploying(false)

    if (!success) return

    if (syncType === 'sync') {
      setCurrentStep(Platform.Step.NOTIFY)
    }
  }

  const handlePre = () => {
    if (currentStep <= Platform.Step.SELECT_APP)
      return handleCancel()

    setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    if (currentStep >= Platform.Step.SYNC)
      return handleDeploy()

    setCurrentStep(currentStep + 1)
  }

  return {
    nextLabel,
    handlePre,
    handleNext,
    disabledNext,
    loading,
  }
}

export const useConfig = () => {
  const [selectedApp] = useAtom(selectedAppAtom)
  const [defaultValue, setDefaultValue] = React.useState<Pipeline>({} as Pipeline)
  const [moduleDefinitions, setModuleDefinitions] =
    React.useState<ModuleDefinitions>({} as ModuleDefinitions)

  const { config_url, id, adapter_device } = selectedApp || {}

  const fetchConfig = async () => {
    try {
      if (!id || !config_url) {
        setDefaultValue({} as Pipeline)
        setModuleDefinitions({} as ModuleDefinitions)
        return
      }

      const defaultValue = await http.get(config_url)

      if (!defaultValue?.version) {
        setDefaultValue({} as Pipeline)
        setModuleDefinitions({} as ModuleDefinitions)
        return
      }

      const { data } = await http.get(`/v3/moduleDefinitions/${defaultValue.version}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })

      if (!data?.url) {
        setDefaultValue({} as Pipeline)
        setModuleDefinitions({} as ModuleDefinitions)
        return
      }

      const moduleDefinitions = await http.get(data.url)

      if (!moduleDefinitions) {
        setDefaultValue({} as Pipeline)
        setModuleDefinitions({} as ModuleDefinitions)
        return
      }

      setDefaultValue(defaultValue || {} as Pipeline)
      setModuleDefinitions(moduleDefinitions || {} as ModuleDefinitions)
    } catch (e) {
      console.error(e)
    }

  }

  React.useEffect(
    () => {
      fetchConfig()
    },
    [id, config_url]
  )


  return {
    flowValue: {
      defaultValue,
      moduleDefinitions,
    },
    appBaseInfo: {
      id,
      adapter_device,
    }
  }
}

export const useNotify = () => {
  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const handleClick = () => {
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE,
      }
    )
    navigate(
      {
        pathname: APP_SELECT_DEPLOY_TYPE,
      }
    )
  }

  return {
    handleClick,
  }
}
