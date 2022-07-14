import TrainInfo from './TrainInfo'
import TrianFlow from './TrianFlow'
import ModelDetailType from '../types'
// import { useEffect, useState, useRef } from 'react'
// import api from '@api'

import { useMemo } from 'react'

import './TrainingOrFailed.module.less'

const TrainingOrFailed = (props: ModelDetailType.TrainingOrFailedProps): JSX.Element => {
  const { id } = props

  return (
    <div styleName='TrainingOrFailed'>
      <div className='TrainingOrFailed_left_wrap'>
        {
          useMemo(() => {
            return (
              <TrainInfo />
            )
          }, [])
        }
      </div>
      <div className='TrainingOrFailed_right_wrap'>
        {
          useMemo(() => {
            return (
              <TrianFlow id={id} />
            )
          }, [id])
        }
      </div>
    </div>
  )
}

export default TrainingOrFailed
