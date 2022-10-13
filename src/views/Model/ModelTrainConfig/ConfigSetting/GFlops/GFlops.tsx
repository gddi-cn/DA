import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { useCallback, useEffect, useState } from 'react'
import { isNil, isEmpty } from 'lodash'
import api from '@api'
import './GFlops.module.less'

const GFlops = (): JSX.Element => {
  const [GFlopsNum, setGFlopsNum] = useState('请选择芯片')
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const task_scene = useSelector((state: RootState) => {
    return state.tasksSilce?.activePipeLine?.APP_DATA_SET_INDEX?.scene || ''
  })
  const fetchFn = useCallback(async () => {
    if (!isEmpty(activePipeLine?.APP_MODEL_TRAIN_CONFIG)) {
      const config = activePipeLine?.APP_MODEL_TRAIN_CONFIG
      if (!isNil(config.fps)) {
        // setGFlopsNum(`${111}GFlops`)
        const { fps, chip_info, channel } = config
        const { application, brand, chip_type, name } = chip_info
        const res = await api.get(`/v3/capacity/${application}/value`, {
          params: {
            brand, name, chip_type, fps, channel, task_type: task_scene
          }
        })

        if (res?.code === 0) {
          const { result } = res.data
          setGFlopsNum(`${result} GFlops`)
        } else {
          setGFlopsNum(res?.message || '')
        }
      }
    }
  }, [activePipeLine?.APP_MODEL_TRAIN_CONFIG, task_scene])

  useEffect(() => {
    fetchFn()
  }, [fetchFn])

  return (
    <div styleName='GFlops'>
      <p>预估模型计算量：</p>
      <p>{GFlopsNum}</p>
    </div>
  )
}

export default GFlops
