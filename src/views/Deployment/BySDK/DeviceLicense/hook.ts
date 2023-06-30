import React from 'react'
import { useSelector } from 'react-redux'
import { useAtom } from 'jotai'

import { RootState } from '@reducer'

type ModelInfo = {
  id?: string,
  version_id?: string,
}

import { idAtom, versionIdAtom } from './store'
import { currentModelVersionIdAtom } from '@src/store/dataset'

export const useInit = () => {
  const [, setId] = useAtom(idAtom)
  const [, setVersionId] = useAtom(versionIdAtom)

  const { id } =
    useSelector((state: RootState) => (state.tasksSilce.activeTaskInfo.model) as ModelInfo) || ({} as ModelInfo)

  const [ version_id ] =
    useAtom(currentModelVersionIdAtom)

  React.useEffect(
    () => {
      setId(id)
      setVersionId(version_id)
      return () => {
        setId(undefined)
        setVersionId(undefined)
      }
    },
    [id, version_id]
  )
}
