import { DatasetScene } from '@src/shared/enum/dataset'
import { useAtom } from 'jotai'

import { activeTypeAtom } from './store'
import React from 'react'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'

export const useTrainTypeItem = (scene: DatasetScene) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [currentScene, setCurrentScene] = useAtom(activeTypeAtom)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const selected = (currentScene as DatasetScene) === scene

  const handleClick = () => {
    if (selected) return
    setCurrentScene(scene)
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

  return {
    containerRef,
    handleClick,
  }
}
