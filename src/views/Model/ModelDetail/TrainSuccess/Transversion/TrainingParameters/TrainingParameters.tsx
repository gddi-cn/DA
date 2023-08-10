import { GEcharts, GSelect } from '@src/UIComponents'
import { getOptions } from './options'
import { useMemo, useState, useRef, useEffect } from 'react'
import { isNil, isEmpty } from 'lodash'
import {
  Empty, Select
} from 'antd'
import { useGetLineDataV2 } from './hooks'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { RadarChartOutlined, SlidersOutlined } from '@ant-design/icons'
import './TrainingParameters.module.less'
import {Box, CircularProgress, Typography} from '@mui/material'

const { Option } = Select;

const titleObj: {
  [index: string]: string
} = {
  lr: '学习率',
  loss: '损失',
  memory: '显存占用',
  'map-50': '评价指标1 map-50',
  'map-95': '评价指标2 map-95'
}

const LineChart = (props: any) => {
  const { option = { xData: {}, yData: [] } } = props

  const { yData: _yData, xData } = option

  const yData: Array<any> = []
  Object.keys(_yData)
    .sort()
    .forEach((key) => {
      yData.push(_yData[key])
    })

  return (
    <GEcharts options={getOptions(yData, xData)} />
  )
}

const Fallback: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box sx={{ margin: 'auto'}}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <CircularProgress sx={{ fontSize: 24 }} />
        </Box>
        <Typography textAlign={'center'} variant={'h6'}>数据加载中...</Typography>
      </Box>
    </Box>
  )
}

const TrainingParameters = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const [tab, setTab] = useState('processOption')
  const [currentData, setCurrentData] = useState<any>({ xData: {}, yData: [] })

  const [currentkey, setCurrentkey] = useState('')

  const trainTaskId = versionInfo?.iter?.train_task_id

  const realKey = useRef('')
  const isFirst = useRef(true)
  const [accuracyOption, processOption] = useGetLineDataV2({ trainTaskId: trainTaskId })
  const [init, setInit] = useState(false)

  // 初始化
  useEffect(() => {
    if (isFirst.current) {
      if (!isEmpty(processOption.xData)) {
        isFirst.current = false
        const { yData, xData } = processOption
        const defaultV = Object.keys(yData)[0]
        realKey.current = defaultV
        setCurrentkey(titleObj[defaultV] || defaultV)
        setCurrentData({ xData, yData: Object.values(yData)[0] })

        setInit(true)
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

  useEffect(() => {
    if (!isFirst.current && realKey.current) {
      if (tab === 'accuracyOption') {
        const { yData, xData } = accuracyOption
        setCurrentData({ xData, yData: yData[realKey.current] })
      }
      if (tab === 'processOption') {
        const { yData, xData } = processOption
        setCurrentData({ xData, yData: yData[realKey.current] })
      }
    }
  }, [accuracyOption, currentkey, processOption, tab])

  const handleChange = (value: any) => {
    realKey.current = value
    setCurrentkey(titleObj[value] || value)
  }
  const getSelect = () => {
    const fn = (data: any) => {
      const nodes = []
      const { yData } = data

      for (const [k] of Object.entries(yData)) {
        nodes.push(
          <Option key={k} value={k}>{titleObj[k] || k}</Option>
        )
      }
      return (
        <GSelect value={currentkey} style={{ width: 180 }} onChange={handleChange} >
          {nodes}
        </GSelect>
      )
    }
    if (tab === 'accuracyOption') {
      return fn(accuracyOption)
    }
    if (tab === 'processOption') {
      return fn(processOption)
    }
    return null
  }

  const handleClickAcc = () => {
    setTab('accuracyOption')
    const { yData, xData } = accuracyOption
    const defaultV = Object.keys(yData)[0]
    realKey.current = defaultV
    setCurrentkey(titleObj[defaultV] || defaultV)
    setCurrentData({ xData, yData: Object.values(yData)[0] })
  }

  const handleClickParams = () => {
    setTab('processOption')
    const { yData, xData } = processOption
    const defaultV = Object.keys(yData)[0]
    realKey.current = defaultV
    setCurrentkey(titleObj[defaultV] || defaultV)
    setCurrentData({ xData, yData: Object.values(yData)[0] })
  }


  const getViews = useMemo(
    () => {
      if (isNil(trainTaskId) || !currentData.yData || Object.keys(currentData.yData).length <= 0) {
        return (
          <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
            <Empty />
          </Box>
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

  if (!init) {
    return <Fallback />
  }

  return (
    <div styleName='TrainingParameters'>
      <div className='params_wrap'>
        <div className='radio_wrap'>
          <div className={`radio_wrap_item ${tab === 'processOption' ? 'radio_wrap_item_active' : ''}`} onClick={handleClickParams}>
            <SlidersOutlined />
            <div className='radio_wrap_item_text'>训练参数</div>
          </div>
          <div className={`radio_wrap_item ${tab === 'accuracyOption' ? 'radio_wrap_item_active' : ''}`} onClick={handleClickAcc}>
            <RadarChartOutlined />
            <div className='radio_wrap_item_text'>训练准确率</div>
          </div>
        </div>
        <div className='select_wrap'>
          <div className='select_title'>评价指标选择：</div>
          <div>
            {getSelect()}
          </div>
        </div>
      </div>
      {getViews}
    </div>
  )
}

export default TrainingParameters
