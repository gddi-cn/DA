import { useAtom } from 'jotai'
import { lighten } from 'polished'

import { falseTypeAtom, falseListAtom, selectedItemKeyAtom } from '../store'
import { ScoreProps } from './type'
import React from 'react'
export const useLeft = () => {
  const [falseType] = useAtom(falseTypeAtom)
  const [scoreList] = useAtom(falseListAtom)

  return {
    falseType,
    scoreList,
  }
}

export const useScoreItem = (props: ScoreProps) => {
  const { score, sceneTip, labelTip, uid, index } = props

  const scoreBarRef = React.useRef<HTMLDivElement | null>(null)

  const [falseType] = useAtom(falseTypeAtom)
  const [selectedItemKey, setSelectedItemKey] = useAtom(selectedItemKeyAtom)

  const backgroundColor = lighten(0.13 * index, '#085082')
  const width = `${Math.max(0, Math.min(score, 100))}%`

  const selected = selectedItemKey === uid
  const handleClick = () => {
    setSelectedItemKey(selected ? null : uid)
  }

  React.useEffect(
    () => {
      const $s = scoreBarRef.current
      if (!$s) return

      if (selected) {
        $s.setAttribute('selected', '')
      } else {
        $s.removeAttribute('selected')
      }
    },
    [selected]
  )

  return {
    backgroundColor,
    width,
    falseType,
    sceneLabel: sceneTip.label,
    labelTip,
    scoreBarRef,
    handleClick,
  }
}
