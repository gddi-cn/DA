
import { ReactComponent as Note } from './icon/note.svg'

import ClassTable from './ClassTable'
import EchartBar from './EchartBar'
import { Dispatch, SetStateAction, useState, useCallback, useEffect, useMemo } from 'react'
import { bytesToSize } from '@src/utils'
import { IsEchartViewButton } from '@src/UIComponents'
import api from '@api'
import { isNil } from 'lodash';
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import './BaseInfo.module.less'
import { DatasetScene } from '@src/shared/enum/dataset'

type Props={
    // version:any,
    currentSet: any,
    datasetInfo: Data,
    whichSet: string,
    setClassInfo: Dispatch<SetStateAction<any>>,
    classInfo: any
}

const BaseInfo = (props: Props): JSX.Element => {
  const { setClassInfo, classInfo, currentSet, datasetInfo } = props
  const [checkType, setCheckType] = useState('FormView')
  const [statistic, setStatistic] = useState<any>({})

  // 统计信息、标签之类的
  const fetStatistics = useCallback(
    async () => {
      try {
        if (isNil(datasetInfo?.id)) {
          return
        }
        const res = await api.get(`/v3/datasets/${datasetInfo?.id}/sub-datasets/${currentSet?.id}/classes`, {
          params: {
            page: 1, page_size: 999
          }
        })

        if (res.code === 0) {
          setStatistic(res.data || [])
          if (res.data) {
            setClassInfo(res.data[0])
          }
        }
      } catch (e) {

      }
    }, [currentSet?.id, datasetInfo?.id, setClassInfo, setStatistic]
  )

  useEffect(() => {
    fetStatistics()
  }, [fetStatistics])
  const handleCheckView = () => {
    if (checkType === 'FormView') {
      setCheckType('EchartView')
    } else {
      setCheckType('FormView')
    }
  }

  const TableView = useMemo(() => (
    <div className='echartOrTable' >
      <ClassTable

        setClassInfo={setClassInfo}
        classInfo={classInfo}
        currentSet={currentSet}

        statistic={statistic}
        scene={datasetInfo?.scene as DatasetScene}
      />
    </div>
  ), [setClassInfo, classInfo, currentSet, statistic])

  const BarView = useMemo(
    () => {
      return (
        <EchartBar dataList={statistic}/>
      )
    }, [statistic]
  )

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

        <IsEchartViewButton onClick={handleCheckView}/>
      </div>

      {
        checkType === 'EchartView' ? BarView : TableView
      }
    </div>
  )
}

export default BaseInfo
