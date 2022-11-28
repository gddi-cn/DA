import { ReactCusScrollBar, IsEchartViewButton, GEcharts, Glegend } from '@src/UIComponents'
import { getOptions, getThresOptions } from '../utils'
import { useState } from 'react'
import './ContrastView.module.less'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { DatasetScene } from '@src/shared/enum/dataset'

const FormView = (props: any) => {
  const { dataList } = props

  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })

  const isClassify = versionInfo?.model_type && (versionInfo.model_type as DatasetScene) === DatasetScene.Classify

  return (
    <div className='FormView'>
      <div className={['FormView_header', isClassify ? '' : '_6'].join(' ')}>
        <div className='FormView_header_item'>模型版本</div>
        <div className='FormView_header_item'>验证集版本</div>
        {
          isClassify ? null : (
            <div className='FormView_header_item'>阈值</div>
          )
        }
        <div className='FormView_header_item'>精准率</div>
        <div className='FormView_header_item'>召回率</div>
        <div className='FormView_header_item'>F1 SCORE</div>
      </div>
      <div className='FormView_body'>
        <ReactCusScrollBar id='TrainingAccuracy'>
          {
            dataList.map((o: any, i: any) => {
              return (
                <div className={['FormView_body_item_wrap', isClassify ? '' : '_6'].join(' ')} key={i}>
                  <div className='FormView_body_item'>{o.tag}</div>
                  <div className='FormView_body_item'>{o.dataset_name}</div>
                  {
                    isClassify ? null : (
                      <div className='FormView_body_item'>
                        {(o.threshold || o.threshold === 0) && !isNaN(parseInt(o.threshold)) ? o.threshold / 100 : '--'}
                      </div>
                    )
                  }
                  <div className='FormView_body_item'>
                    {o.accuracy && !isNaN(parseInt(o.accuracy)) ? `${(o.accuracy * 1e4 | 0) / 1e2} %` : '--'}
                  </div>
                  <div className='FormView_body_item'>
                    {o.recall && !isNaN(parseInt(o.recall)) ? `${(o.recall * 1e4 | 0) /1e2} %` : '--'}
                  </div>
                  <div className='FormView_body_item'>
                    {o.fScore && !isNaN(parseInt(o.fScore)) ? `${(o.fScore * 1e4 | 0) /1e2} %` : '--'}
                  </div>
                </div>
              )
            })
          }

        </ReactCusScrollBar>

      </div>
    </div>
  )
}

const EchartView = (props: any) => {
  const { dataList, config_type } = props
  const list = config_type === 'version' ? getOptions(dataList) : getThresOptions(dataList)
  return (
    <div className='EchartView'>
      <div className='cus_legend_wrap'>
        <Glegend color='#A3D0EF' label='准确率'></Glegend>
        <Glegend color='#5AABE2' label='召回率'></Glegend>
        <Glegend color='#085082' label='F1 Score'></Glegend>
      </div>
      <div className='chart_wrap'>
        <GEcharts options={list} />
      </div>
    </div>
  )
}

const ContrastView = (props: any): JSX.Element => {
  const { dataList, deferFilterParams } = props
  //      config_type: 'version',
  const { config_type } = deferFilterParams
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
        {
          checkType === 'FormView' ? <FormView dataList={dataList} /> : <EchartView dataList={dataList} config_type={config_type} />
        }

      </div>

    </div>
  )
}

export default ContrastView
