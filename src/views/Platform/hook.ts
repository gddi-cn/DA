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
  fetchingAppListAtom,
  fetchingDeviceTypeListAtom,
  modelVersionIdAtom,
  selectDeviceTypeAtom,
  selectedAppAtom,
  selectedDeviceGroupAtom, selectedDeviceIdListAtom
} from './store'
import { Platform } from '@views/Platform/enum'
import appAPI from '@src/apis/app'
import deviceAPI from '@src/apis/device'
import { DeviceType } from '@src/shared/enum/device'
import http from '@src/utils/http'
import { ModuleDefinitions, Pipeline } from 'gddi-app-canvas'

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

  const modelVersionId =
    useSelector((state: RootState) => state.tasksSilce.activeTaskInfo?.model?.version_id)

  const showSelectApp = currentStep === Platform.Step.SELECT_APP
  const showConfig = currentStep === Platform.Step.CONFIG
  const showSelectDevice = currentStep === Platform.Step.SELECT_DEVICE
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
    showContent,
  }
}

export const useStep = () => {
  const selectAppRef = React.useRef<HTMLDivElement | null>(null)
  const firstArrowRef = React.useRef<HTMLDivElement | null>(null)
  const configRef = React.useRef<HTMLDivElement | null>(null)
  const secondArrowRef = React.useRef<HTMLDivElement | null>(null)
  const selectDeviceRef = React.useRef<HTMLDivElement | null>(null)

  const [currentStep] = useAtom(currentStepAtom)

  React.useEffect(
    () => {
      switch (currentStep) {
        case Platform.Step.SELECT_APP:
          setActive(selectAppRef)
          setInactive(firstArrowRef)
          setInactive(configRef)
          setInactive(secondArrowRef)
          setInactive(selectDeviceRef)
          break
        case Platform.Step.CONFIG:
          setActive(selectAppRef)
          setActive(firstArrowRef)
          setActive(configRef)
          setInactive(secondArrowRef)
          setInactive(selectDeviceRef)
          break
        case Platform.Step.SELECT_DEVICE:
          setActive(selectAppRef)
          setActive(firstArrowRef)
          setActive(configRef)
          setActive(secondArrowRef)
          setActive(selectDeviceRef)
          break
        default:
          break
      }
    },
    [currentStep]
  )

  return {
    selectAppRef,
    firstArrowRef,
    configRef,
    secondArrowRef,
    selectDeviceRef,
  }
}

export const useFooter = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const [selectedApp] = useAtom(selectedAppAtom)
  const [selectedDeviceIdList] = useAtom(selectedDeviceIdListAtom)
  const [deploying, setDeploying] = React.useState<boolean>(false)

  const navigate = useNavigate()

  const nextLabel = currentStep === Platform.Step.SELECT_DEVICE ? '下发部署' : '下一步'

  const disabledNext =
    (currentStep === Platform.Step.SELECT_APP && !selectedApp)
  || (currentStep === Platform.Step.SELECT_DEVICE && !selectedDeviceIdList.length)

  const loading =
    (currentStep === Platform.Step.SELECT_DEVICE && deploying)

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

    setDeploying(true)
    const { success } = await appAPI.sync(selectedApp.id, { device_ids: selectedDeviceIdList })
    setDeploying(false)

    if (!success) return

    setCurrentStep(Platform.Step.NOTIFY)
  }

  const handlePre = () => {
    if (currentStep <= Platform.Step.SELECT_APP)
      return handleCancel()

    setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    if (currentStep >= Platform.Step.SELECT_DEVICE)
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
  const [moduleDefinitions, setModuleDefinitions] = React.useState<ModuleDefinitions>({} as ModuleDefinitions)

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
    appBaseINfo: {
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
