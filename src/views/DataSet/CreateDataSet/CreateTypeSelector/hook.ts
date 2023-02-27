import { DatasetCreateType } from '@src/shared/enum/dataset'
import { useAtom } from 'jotai'

import { selectedTypeAtom } from './store'
import {
  datasetCreateTypeLogoMapping, datasetCreateTypeNameMapping
} from '@src/shared/mapping/dataset'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  APP_DATA_SET_INDEX,
  APP_LOCAL_FILE_STEP_1,
  APP_THIRDPARTY_SelectTrainType, APP_UNREMARKED_CREATE
} from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { useBack2DatasetIndex } from '@src/hooks/task'

export const useTypeItem = (createType: DatasetCreateType) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const { logo, title } = React.useMemo(
    () => {
      const logo = datasetCreateTypeLogoMapping.get(createType)
      const title = datasetCreateTypeNameMapping.get(createType)

      return {
        logo,
        title,
      }
    },
    [createType]
  )

  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom)

  const selected = selectedType === createType

  const handleClick = () => {
    if (selected) return setSelectedType(null)
    setSelectedType(createType)
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

  React.useEffect(
    () => {
      return () => {
        setSelectedType(null)
      }
    },
    []
  )

  return {
    containerRef,
    logo,
    title,
    handleClick,
  }
}

export const useFooter = () => {
  const navigate = useNavigate()
  const [selectedType] = useAtom(selectedTypeAtom)

  const handleCancel = useBack2DatasetIndex()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })


  const handleNext = () => {
    switch (selectedType) {
      case DatasetCreateType.UPLOAD_UNREMARKED:
        navigate({ pathname: APP_UNREMARKED_CREATE })
        socketPushMsgForProject(activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_UNREMARKED_CREATE
        })
        break
      case DatasetCreateType.UPLOAD_REMARKED:
        navigate({ pathname: APP_LOCAL_FILE_STEP_1 })
        socketPushMsgForProject(activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_1
        })
        break
      case DatasetCreateType.IMPORT_THIRD_PARTY:
        navigate({ pathname: APP_THIRDPARTY_SelectTrainType })
        socketPushMsgForProject(activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_SelectTrainType
        })
        break
      default:
        break
    }
  }

  return {
    disabled: !selectedType,
    handleNext,
    handleCancel,
  }
}
