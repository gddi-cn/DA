import React from 'react'
import { Progress, Tooltip } from 'antd'
import { getColor, getScoreClass, getSubColor } from '@views/DataSet/DatasetAnalysis/utils'
import { ScoreClass } from '@src/shared/enum/dataset'

export const getProgressClassName = (score: number): string => {
  const sc = getScoreClass(score)

  switch (sc) {
  case ScoreClass.Excellent:
    return 'green'
  case ScoreClass.Great:
    return 'green'
  case ScoreClass.NotBad:
    return 'blue'
  case ScoreClass.Bad:
    return 'red'
  }
}

const Score: React.FC<{ score?: number, explain?: string }> = (
  {
    score = 0,
    explain,
  }
) => {
  const [strokeColor, trailColor] = React.useMemo(
    () => {
      const sc = getScoreClass(score || 0)
      return [getColor(sc), getSubColor(sc)]
    },
    [score]
  )

  return (
    <Tooltip title={explain || '--'} placement='right' className='tooltip'>
      <Progress
        className={`content-${getProgressClassName(score || 0)}`}
        width={180}
        strokeLinecap="butt"
        type="circle"
        percent={score}
        strokeColor={strokeColor}
        trailColor={trailColor}
        strokeWidth={12}
        format={percent => `${percent} %`}
      />
    </Tooltip>
  )
}

export default Score
