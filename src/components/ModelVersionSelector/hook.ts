import React from 'react'
import { useAtom } from 'jotai'

import { currentVersionIdAtom, fetchingVersionList, versionListAtom } from './store'
import { RootState } from '@reducer'
import { useSelector } from 'react-redux'
import modelAPI from '@src/apis/model'

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

export const useVersionSelector = () => {
  useResetStore()
  const [currentVersionId, setCurrentVersionId] = useAtom(currentVersionIdAtom)
  const [versionList] = useAtom(versionListAtom)

  const initialModelVersionId =
    useSelector((state: RootState) =>
    state.tasksSilce?.activePipeLine?.APP_MODEL_TRAIN_DETAIL?.version_id)

  const modelId = useSelector((state: RootState) => state.tasksSilce?.activeTaskInfo?.model?.id)

  const refreshVersion = useRefreshVersionList()

  const optionsList = versionList.map(version => ({
    key: version.id,
    label: version.name,
    value: version.id,
  }))

  const handleChange = (newValue: Model.Version['id']) => {
    setCurrentVersionId(newValue)
  }

  React.useEffect(
    () => {
      setCurrentVersionId(initialModelVersionId)
      refreshVersion()
    },
    [modelId, initialModelVersionId]
  )

  return {
    currentVersionId,
    optionsList,
    handleChange,
  }
}
