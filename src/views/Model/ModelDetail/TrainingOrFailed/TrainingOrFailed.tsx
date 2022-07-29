import TrainInfo from './TrainInfo'
import TrianFlow from './TrianFlow'

// import { useEffect, useState, useRef } from 'react'
// import api from '@api'
// import { useSelector } from 'react-redux'
// import { RootState } from '@reducer/index'
import { useMemo } from 'react'

import './TrainingOrFailed.module.less'

const TrainingOrFailed = (): JSX.Element => {
  // const id = useSelector((state: RootState) => {
  //   return state.modelDetailSlice.id || ''
  // })

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
              <TrianFlow />
            )
          }, [])
        }
      </div>
    </div>
  )
}

export default TrainingOrFailed
