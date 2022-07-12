import TrainInfo from './TrainInfo'
import TrianFlow from './TrianFlow'
import ModelDetailType from '../types'
// import { useEffect, useState, useRef } from 'react'
// import api from '@api'
import './TrainingOrFailed.module.less'
import { useMemo } from 'react'

const TrainingOrFailed = (props: ModelDetailType.TrainingOrFailedProps): JSX.Element => {
  const { id, currentVersion, versionInfo } = props

  return (
    <div styleName='TrainingOrFailed'>
      <div className='TrainingOrFailed_left_wrap'>
        {
          useMemo(() => {
            return (
              <TrainInfo versionInfo={versionInfo} />
            )
          }, [versionInfo])
        }
      </div>
      <div className='TrainingOrFailed_right_wrap'>
        {
          useMemo(() => {
            return (
              <TrianFlow id={id} currentVersion={currentVersion} />
            )
          }, [currentVersion, id])
        }
      </div>
    </div>
  )
}

export default TrainingOrFailed
