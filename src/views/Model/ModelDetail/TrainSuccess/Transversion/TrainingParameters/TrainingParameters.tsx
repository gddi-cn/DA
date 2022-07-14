import { GEcharts } from '@src/UIComponents'
import { getOptions } from './options'
import { useMemo, useState, useRef, useEffect } from 'react'
import { isNil, isEmpty } from 'lodash'
import {
  Empty
} from 'antd'
import { useGetLineDataV2 } from './hooks'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import './TrainingParameters.module.less'

const LineChart = (props:any) => {
  const { option = { xData: {}, yData: [] } } = props

  const { yData, xData } = option
  return (
    <GEcharts options={getOptions(yData, xData)} />
  )
}

const TrainingParameters = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const [currentData, setCurrentData] = useState<any>({ xData: {}, yData: [] })
  const trainTaskId = versionInfo?.iter?.train_task_id

  const realKey = useRef('')
  const isFirst = useRef(true)
  const [processOption] = useGetLineDataV2({ trainTaskId: trainTaskId })
  // 初始化
  useEffect(() => {
    if (isFirst.current) {
      if (!isEmpty(processOption.xData)) {
        isFirst.current = false
        const { yData, xData } = processOption
        const defaultV = Object.keys(yData)[0]
        realKey.current = defaultV

        // console.log(xData, 'xDataxDataxData')
        // console.log(yData, 'yDatayData')
        setCurrentData({ xData, yData: Object.values(yData)[0] })
      }
    }
  }, [processOption])

  // socket的更新这个也更新
  useEffect(() => {
    if (!isFirst.current && realKey.current) {
      const { yData, xData } = processOption

      setCurrentData({ xData, yData: yData[realKey.current] })
    }
  }, [processOption])

  const getViews = useMemo(
    () => {
      if (isNil(trainTaskId)) {
        return (
          <Empty />
        )
      }
      return (
        <>
          <div className='chart-container'>
            <LineChart option={currentData} />
          </div>

        </>
      )
    }, [currentData, trainTaskId]
  )
  return (
    <div styleName='TrainingParameters'>
      {getViews}
    </div>
  )
}

export default TrainingParameters
