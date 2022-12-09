import { useAtom } from 'jotai'
import {
  displayTypeAtom,
  falseTypeAtom,
  selectedItemAtom
} from '@views/Model/ModelDetail/TrainSuccess/ErrorAnalysis/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

export const useHeader = () => {
  const [falseType] = useAtom(falseTypeAtom)
  const [selectedItem] = useAtom(selectedItemAtom)
  const [displayType, setDisplayType] = useAtom(displayTypeAtom)

  const activePipeLine = useSelector((state: RootState) => state.tasksSilce.activePipeLine || {})

  const gridRef = React.useRef<HTMLDivElement | null>(null)
  const slickRef = React.useRef<HTMLDivElement | null>(null)

  const handleClick = (type: 'grid' | 'slick') => {
    setDisplayType(type)
  }

  const handleAddData = () => {
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL
    })
  }

  React.useEffect(
    () => {
      if (displayType === 'grid') {
        gridRef.current?.setAttribute('selected', '')
        slickRef.current?.removeAttribute('selected')
      } else {
        gridRef.current?.removeAttribute('selected')
        slickRef.current?.setAttribute('selected', '')
      }
    },
    [displayType]
  )

  return {
    falseType,
    gridRef,
    slickRef,
    sceneTip: selectedItem?.sceneTip,
    labelTip: selectedItem?.labelTip,
    handleClick,
    handleAddData,
  }
}

export const useAlbum = () => {
  const [displayType] = useAtom(displayTypeAtom)
  const [selectedItem] = useAtom(selectedItemAtom)

  return {
    displayType,
    dataList: selectedItem?.dataList || []
  }
}
