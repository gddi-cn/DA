
import { ReactComponent as Note } from './icon/note.svg'

import ClassTable from './ClassTable'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { bytesToSize } from '@src/utils'
import { IsEchartViewButton } from '@src/UIComponents'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import './BaseInfo.module.less'

type Props={
    // version:any,
    currentSet: any,
    datasetInfo: Data,
    whichSet: string,
    setClassInfo: Dispatch<SetStateAction<any>>,
    classInfo: any
}

const BaseInfo = (props: Props): JSX.Element => {
  const { whichSet, setClassInfo, classInfo, currentSet, datasetInfo } = props

  return (
    <div styleName='BaseInfo'>

      <div className='describtion_wrap'>
        <Note/>
        <div className='describtion'>{datasetInfo.summary || '暂无描述'}</div>
      </div>
      <div className='info_list_and_btn_wrap'>
        <div className='info_list'>
          <div className='info_item_wrap'>
            <p className='label'>数据大小：</p>
            <p className='text'>{currentSet.size ? bytesToSize(currentSet.size) : '--' }</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>数据量：</p>
            <p className='text'>{currentSet.image_count}</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>标注数：</p>
            <p className='text'>{currentSet.annotation_count}</p>
          </div>
          <div className='info_item_wrap'>
            <p className='label'>标签种类：</p>
            <p className='text'>{currentSet.class_count}</p>
          </div>
        </div>

        <IsEchartViewButton />
      </div>

      {
        useMemo(() => (
          <div className='echartOrTable'>
            <ClassTable
              datasetInfo={datasetInfo}
              whichSet={whichSet}
              setClassInfo={setClassInfo}
              classInfo={classInfo}
              currentSet={currentSet}
            />
          </div>
        ), [classInfo, setClassInfo, whichSet, currentSet, datasetInfo])
      }
    </div>
  )
}

export default BaseInfo
