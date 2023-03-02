import React from 'react'
import { useAtom } from 'jotai'

import { currentVersionIdAtom, fetchingVersionList, versionListAtom } from './store'
import { RootState } from '@reducer'
import { useSelector } from 'react-redux'
import modelAPI from '@src/apis/model'
import { modelVersionStatusNameMapping } from '@src/shared/mapping/model'

const getVersionOptionLabel = (label: Model.Version['name'], status: Model.Version['status']) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    }}
    >
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </div>
      <div style={{ color: '#a0a0a0' }}>{modelVersionStatusNameMapping.get(status) || '暂无应用'}</div>
    </div>
  )
}

const useResetStore = () => {
  const [, setCurrentVersionId] = useAtom(currentVersionIdAtom)
  const [, setVerisonList] = useAtom(versionListAtom)
  const [, setLoading] = useAtom(fetchingVersionList)

  React.useEffect(
    () => () => {
      setLoading(true)
      setCurrentVersionId(undefined)
      setVerisonList([])
      setLoading(false)
    },
    []
  )
}

export const useRefreshVersionList = () => {
  const [, setVersionList] = useAtom(versionListAtom)
  const [loading, setLoading] = useAtom(fetchingVersionList)

  const modelId = useSelector((state: RootState) => state.tasksSilce?.activeTaskInfo?.model?.id)

  return async () => {
    if (loading) return

    if (!modelId) {
      setVersionList([])
      return
    }

    setLoading(true)
    const { success, data } = await modelAPI.versionList(modelId)
    setLoading(false)

    if (!success || !data) {
      setVersionList([])
    }

    setVersionList(data?.versions || [])
  }
}

export const useIntervalRefreshVersionList = (interval: number) => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const refresh = useRefreshVersionList()

  React.useEffect(
    () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(() => {
        refresh()
      }, interval)

      return () => {
        timerRef.current && clearInterval(timerRef.current)
      }
    },
    []
  )
}

export const useVersionSelector = (disabledAutoSelect = false) => {
  useResetStore()
  useIntervalRefreshVersionList(5e3)
  const [currentVersionId, setCurrentVersionId] = useAtom(currentVersionIdAtom)
  const [versionList] = useAtom(versionListAtom)

  const initialModelVersionId =
    useSelector((state: RootState) =>
    state.tasksSilce?.activePipeLine?.APP_MODEL_TRAIN_DETAIL?.version_id)

  const modelId = useSelector((state: RootState) => state.tasksSilce?.activeTaskInfo?.model?.id)

  const refreshVersion = useRefreshVersionList()

  const optionsList = versionList.map(({ id, name ,status }) => ({
    key: id,
    label: getVersionOptionLabel(name, status),
    value: id,
  }))

  const handleChange = (newValue: Model.Version['id']) => {
    setCurrentVersionId(newValue)
  }

  React.useEffect(
    () => {
      if (disabledAutoSelect) return
      setCurrentVersionId(initialModelVersionId)
    },
    [initialModelVersionId, disabledAutoSelect]
  )

  React.useEffect(
    () => {
      refreshVersion()
    },
    [modelId]
  )

  return {
    currentVersionId,
    optionsList,
    handleChange,
  }
}
