import { ReactCusScrollBar, IsEchartViewButton } from '@src/UIComponents'
import { useState } from 'react'
import './ContrastView.module.less'

const FormView = (props: any) => {
  const { dataList } = props
  console.log(dataList, 'dataList')

  return (
    <div className='FormView'>
      <div className='FormView_header'>
        <div className='FormView_header_item'>模型版本</div>
        <div className='FormView_header_item'>验证集版本</div>
        <div className='FormView_header_item'>阈值</div>
        <div className='FormView_header_item'>精准率</div>
        <div className='FormView_header_item'>召回率</div>
        <div className='FormView_header_item'>F1 SCORE</div>
      </div>
      <div className='FormView_body'>
        <ReactCusScrollBar id='TrainingAccuracy'>
          {
            dataList.map((o: any, i: any) => {
              return (
                <div className='FormView_body_item_wrap' key={i}>
                  <div className='FormView_body_item'>{o.label}</div>
                  <div className='FormView_body_item'>{o.acc}%</div>
                  <div className='FormView_body_item'>{o.rec}%</div>
                  <div className='FormView_body_item'>{o.rec}%</div>
                  <div className='FormView_body_item'>{o.rec}%</div>
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

const ContrastView = (props: any): JSX.Element => {
  console.log(props)
  const [checkType, setCheckType] = useState('FormView')
  const handleCheckView = () => {
    if (checkType === 'FormView') {
      setCheckType('EchartView')
    } else {
      setCheckType('FormView')
    }
  }
  return (
    <div styleName='ContrastView'>
      <div className='TrainingAccuracy_header'>
        <IsEchartViewButton onClick={handleCheckView} />
      </div>
      <div className='content_wrap'>
        <FormView dataList={[]} />

      </div>

    </div>
  )
}

export default ContrastView
