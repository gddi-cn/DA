import { useAtom } from 'jotai'
import React from 'react'

import { ReactComponent as Note } from './icon/note.svg'
import ClassTable from './ClassTable'
import EchartBar from './EchartBar'
import { bytesToSize } from '@src/utils'
import { IsEchartViewButton } from '@src/UIComponents'
import './BaseInfo.module.less'
import { currentDatasetAtom, currentSubDatasetAtom } from '../../store'
import { useBaseInfo } from './hook'

const BaseInfo = (): JSX.Element => {
  useBaseInfo()

  const [checkType, setCheckType] = React.useState('FormView')
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)

  const handleCheckView = () => {
    if (checkType === 'FormView') {
      setCheckType('EchartView')
    } else {
      setCheckType('FormView')
    }
  }

  return (
    <div styleName='BaseInfo'>

      <div className='describtion_wrap'>
        <Note/>
        <div className='describtion'>{datasetInfo?.summary || '暂无描述'}</div>
      </div>
      <div className='info_list_and_btn_wrap'>
        <div className='info_list'>
          <div className='info_item_wrap'>
            <p className='label'>数据大小：</p>
            <p className='text'>
              {
                currentSubDataset?.size
                  ? bytesToSize(currentSubDataset?.size)
                  : '--'
              }
            </p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>数据量：</p>
            <p className='text'>{currentSubDataset?.image_count || '--'}</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>标注数：</p>
            <p className='text'>{currentSubDataset?.annotation_count || '--'}</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>标签种类：</p>
            <p className='text'>{currentSubDataset?.class_count || '--'}</p>
          </div>
        </div>

        <IsEchartViewButton onClick={handleCheckView}/>
      </div>

      {
        checkType === 'EchartView' ? <EchartBar /> : <ClassTable />
      }
    </div>
  )
}

export default BaseInfo
