import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { APP_SELECT_DEPLOY_TYPE } from '@router'
import { useAtom } from 'jotai'

import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import {
  cancelLoadingAtom,
  creatingAtom,
  detailAtom,
  leftHourAtom, leftMinuteAtom,
  leftTimeAtom,
  loadingAtom,
  modelVersionIdAtom
} from '@views/Experience/store'
import experienceAPI from '@src/apis/experience'
import { ExperienceState } from '@src/shared/enum/experience'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { currentVersionIdAtom } from '@src/components/ModelVersionSelector/store'

export const useFooter = () => {
  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const handleClick = () => {
    navigate({
      pathname: APP_SELECT_DEPLOY_TYPE,
    })
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE
      }
    )
  }

  return {
    handleClick,
  }
}

export const useRefreshDetail = () => {
  const [modelVersionId] = useAtom(modelVersionIdAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [, setDetail] = useAtom(detailAtom)
  const [, setLeftTime] = useAtom(leftTimeAtom)

  return async () => {
    if (loading) return
    if (!modelVersionId) return

    setLoading(true)
    const { success, data } = await experienceAPI.detail(modelVersionId)
    setLoading(false)

    if (!success || !data) {
      setDetail(null)
      return
    }

    setDetail(data)
    const { expire, state } = data || {}

    if (state !== ExperienceState.READY) return

    const now = (Date.now() / 1e3) | 0

    if (now >= (expire || 0)) {
      return
    }

    setLeftTime((expire || 0) - now)
  }
}

export const useExperience = () => {
  const [loading, setLoading] = useAtom(loadingAtom)
  const [, setCreating] = useAtom(creatingAtom)
  const [modelVersionId, setModelVersionId] = useAtom(modelVersionIdAtom)
  const [, setCancelLoading] = useAtom(cancelLoadingAtom)
  const [, setLeftTime] = useAtom(leftTimeAtom)

  const [mId] =
    useAtom(currentVersionIdAtom)

  const refreshDetail = useRefreshDetail()

  const handleClean = () => {
    setLoading(true)
    setModelVersionId(undefined)
    setCreating(false)
    setCancelLoading(false)
    setLeftTime(0)
    setLoading(false)
  }

  React.useEffect(
    () => {
      setModelVersionId(mId)
    },
    [mId]
  )

  React.useEffect(
    () => {
      refreshDetail()
    },
    [modelVersionId]
  )

  React.useEffect(
    () => {
      return handleClean
    },
    []
  )

  return {
    loading,
  }
}

export const useCreate = () => {
  const [id] = useAtom(modelVersionIdAtom)
  const [detail, setDetail] = useAtom(detailAtom)
  const [loading] = useAtom(loadingAtom)
  const [creating, setCreating] = useAtom(creatingAtom)

  const refreshDetail = useRefreshDetail()

  const handleCreate = async () => {
    if (loading || creating || !id) return

    setCreating(true)
    const { success } = await experienceAPI.create(id)
    setCreating(false)

    const refreshPromise = refreshDetail()

    if (!success) return

    await refreshPromise
  }

  return {
    show: !detail,
    disabled: loading,
    loading: creating,
    handleCreate,
  }
}

export const usePending = () => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const [detail] = useAtom(detailAtom)
  const { state, current } = detail || {}

  const show = state === ExperienceState.PENDING
  const refreshDetail = useRefreshDetail()

  React.useEffect(
    () => {
      if (!show) return

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(
        refreshDetail,
        2e3,
      )

      return () => {
        timerRef.current && clearInterval(timerRef.current)
      }
    },
    [show]
  )

  return {
    show,
    left: current || 0,
  }
}

export const useReady = () => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const [detail] = useAtom(detailAtom)
  const [cancelLoading, setCancelLoading] = useAtom(cancelLoadingAtom)
  const [loading] = useAtom(loadingAtom)
  const [, setLeftTime] = useAtom(leftTimeAtom)
  const [hour] = useAtom(leftHourAtom)
  const [minute] = useAtom(leftMinuteAtom)

  const { state, url, expire } = detail || {}

  const refreshDetail = useRefreshDetail()

  const handleCancel = async () => {
    if (!detail?.id) return
    if (cancelLoading || loading) return

    Modal.confirm({
      title: '取消试用',
      icon: <ExclamationCircleOutlined/>,
      content: '确定要取消试用吗？',
      okText: '确定',
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        setCancelLoading(true)
        await experienceAPI.delete(detail!.id)
        setCancelLoading(false)
        await refreshDetail()
      },
    })
  }

  React.useEffect(
    () => {
      timerRef.current && clearInterval(timerRef.current)

      if (state !== ExperienceState.READY) return

      timerRef.current = setInterval(
        () => {
          const now = (Date.now() / 1e3) | 0
          if (now >= (expire || 0)) {
            return
          }
          setLeftTime((expire || 0) - now)
        },
        1e3
      )

    },
    [state]
  )

  React.useEffect(
    () => {
      return () => {
        timerRef.current && clearInterval(timerRef.current)
      }
    },
    []
  )

  return {
    show: state === ExperienceState.READY,
    disabledTry: !url,
    url,
    disabledCancel: !detail?.id || cancelLoading,
    handleCancel,
    hour,
    minute,
  }
}

export const useExpire = () => {
  const [id] = useAtom(modelVersionIdAtom)
  const [detail] = useAtom(detailAtom)
  const [loading] = useAtom(loadingAtom)
  const [creating, setCreating] = useAtom(creatingAtom)
  const { state } = detail || {}

  const refreshDetail = useRefreshDetail()

  const handleCreate = async () => {
    if (loading || creating || !id) return

    setCreating(true)
    const { success } = await experienceAPI.create(id)
    setCreating(false)

    const refreshPromise = refreshDetail()

    if (!success) return

    await refreshPromise
  }

  return {
    show: state === ExperienceState.EXPIRE,
    handleCreate,
    loading: creating,
    disabled: loading,
  }
}

export const useSetup = () => {
  const [detail] = useAtom(detailAtom)
  const { state } = detail || {}
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const show = state === ExperienceState.SETUP

  const refreshDetail = useRefreshDetail()

  React.useEffect(
    () => {
      if (!show) return

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(
        refreshDetail,
        2e3,
      )
      return () => {
        timerRef.current && clearInterval(timerRef.current)
      }
    },
    [show]
  )

  return {
    show,
  }
}
