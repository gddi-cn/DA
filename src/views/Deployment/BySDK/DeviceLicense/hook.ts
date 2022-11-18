import React from 'react'
import { useSelector } from 'react-redux'
import { useAtom } from 'jotai'

import { RootState } from '@reducer'

type ModelInfo = {
  id?: string,
  version_id?: string,
}

import { idAtom, versionIdAtom } from './store'

export const useInit = () => {
  const [, setId] = useAtom(idAtom)
  const [, setVersionId] = useAtom(versionIdAtom)

  const { id, version_id } =
    useSelector((state: RootState) => (state.tasksSilce.activeTaskInfo.model) as ModelInfo) || ({} as ModelInfo)

  React.useEffect(
    () => {
      setId(id)
      setVersionId(version_id)
    },
    [id, version_id]
  )
}