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
  const { score, sceneTip, labelTip, uid } = props

  const scoreBarRef = React.useRef<HTMLDivElement | null>(null)

  const [falseType] = useAtom(falseTypeAtom)
  const [selectedItemKey, setSelectedItemKey] = useAtom(selectedItemKeyAtom)

  const _score = Math.max(0, Math.min(Math.round(score * 100), 100))
  const backgroundColor = lighten(60 * (100 - _score) / 1e4, '#042041')
  const width = `${_score}%`

  const selected = selectedItemKey === uid
  const handleClick = () => {
    if (selected) return
    setSelectedItemKey(uid)
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
