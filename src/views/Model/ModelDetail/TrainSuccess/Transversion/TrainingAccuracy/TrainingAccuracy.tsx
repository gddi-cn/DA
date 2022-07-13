import { IsEchartViewButton, ReactCusScrollBar, GEcharts } from '@src/UIComponents'
import { isNil } from 'lodash'
import { useState, useMemo } from 'react'
import { getOptions } from './options'
import './TrainingAccuracy.module.less'

const FormView = (props:any) => {
  const { dataList } = props
  console.log(dataList, 'dataList')

  return (
    <div className='FormView'>
      <div className='FormView_header'>
        <div className='FormView_header_item'>标签名</div>
        <div className='FormView_header_item'>精准率</div>
        <div className='FormView_header_item'>召回率</div>
      </div>
      <div className='FormView_body'>
        <ReactCusScrollBar id='TrainingAccuracy'>
          {
            dataList.map((o:any, i:any) => {
              return (
                <div className='FormView_body_item_wrap' key={i}>
                  <div className='FormView_body_item'>{o.label}</div>
                  <div className='FormView_body_item'>{o.acc}%</div>
                  <div className='FormView_body_item'>{o.rec}%</div>
                </div>
              )
            })
          }

        </ReactCusScrollBar>

      </div>
    </div>
  )
}

const EchartView = (props:any) => {
  const { dataList } = props
  return (
    <div className='EchartView'>
      <GEcharts options={getOptions(dataList)} />
    </div>
  )
}

const TrainingAccuracy = (props: any): JSX.Element => {
  console.log(props)
  const { versionInfo } = props
  const [checkType, setCheckType] = useState('FormView')
  const handleCheckView = () => {
    if (checkType === 'FormView') {
      setCheckType('EchartView')
    } else {
      setCheckType('FormView')
    }
  }

  const View = useMemo(() => {
    const getData = () => {
      if (!versionInfo) {
        return []
      }
      const { iter } = versionInfo

      if (isNil(iter?.result?.precision_total)) {
        return []
      }

      const obj: any = iter?.result?.precision_total

      const data = []
      for (const [k, v] of Object.entries(obj)) {
        data.push({
          label: k,
          acc: ((v as any)[0] * 100).toFixed(0),
          rec: ((v as any)[1] * 100).toFixed(0),
          key: k + Math.random()
        })
      }
      return data
    }

    const dataList = getData()

    const ReactComp: {
            [index: string]: React.ReactNode
        } = {

          FormView: <FormView dataList={dataList}/>,
          EchartView: <EchartView dataList={dataList} />,

        }

    return ReactComp[checkType] || null
  }, [checkType, versionInfo])
  return (
    <div styleName='TrainingAccuracy'>
      <div className='TrainingAccuracy_header'>
        <IsEchartViewButton onClick={handleCheckView}/>
      </div>
      <div className='content_wrap'>
        {View}

      </div>
    </div>
  )
}

export default TrainingAccuracy
