import React from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { modelVersionStatusNameMapping } from '@src/shared/mapping/model'
import { currentModelVersionIdAtom, modelVersionListAtom } from '@src/store/dataset'

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


export const useIntervalRefreshVersionList = (interval: number) => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const refresh = useSetAtom(modelVersionListAtom)

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

export const useVersionSelector = () => {
  useIntervalRefreshVersionList(5e3)
  const [_currentVersionId, setCurrentVersionId] = useAtom(currentModelVersionIdAtom)
  const versionList = useAtomValue(modelVersionListAtom)

  const currentVersionId = versionList.some(x => x.id === _currentVersionId)
    ? _currentVersionId
    : versionList[0]?.id

  const optionsList = versionList.map(({ id, name ,status }) => ({
    key: id,
    label: getVersionOptionLabel(name, status),
    value: id,
  }))

  const handleChange = (newValue: Model.Version['id']) => {
    setCurrentVersionId(newValue)
  }

  return {
    currentVersionId,
    optionsList,
    handleChange,
  }
}