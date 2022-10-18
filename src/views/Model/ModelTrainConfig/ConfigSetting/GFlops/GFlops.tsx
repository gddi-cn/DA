import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { useCallback, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import api from '@api'
import './GFlops.module.less'
import { message } from 'antd'

const GFlops = (): JSX.Element => {
  const [GFlopsNum, setGFlopsNum] = useState({
    fps: 5, channel: 1
  })
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const mode = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine?.APP_MODEL_TRAIN_CONFIG?.mode || 0
  })
  const task_scene = useSelector((state: RootState) => {
    return state.tasksSilce?.activePipeLine?.APP_DATA_SET_INDEX?.scene || ''
  })
  console.log(activePipeLine, 22)
  const fetchFn = useCallback(async () => {
    try {
      if (!isEmpty(activePipeLine?.APP_MODEL_TRAIN_CONFIG)) {
        const config = activePipeLine?.APP_MODEL_TRAIN_CONFIG
        const { fps, chip_info, channel, mode } = config
        const { application, brand, chip_type, name } = chip_info

        const res = await api.get(`/v3/capacity/${application}/value`, {
          params: {
            brand, name, chip_type, fps, channel, task_type: task_scene, mode
          }
        })

        if (res?.code === 0) {
          const { fps, channel } = res.data
          setGFlopsNum({ fps, channel })
        } else {
          message.error(res?.message)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [activePipeLine?.APP_MODEL_TRAIN_CONFIG, task_scene])

  useEffect(() => {
    fetchFn()
  }, [fetchFn])

  return (
    <div styleName='GFlops'>
      {
        mode === 0 ? null : (
          <>
            <p>fps：{GFlopsNum.fps}</p>

            <p>算法并行数：{GFlopsNum.channel}</p>

          </>
        )
      }

    </div>
  )
}

export default GFlops
