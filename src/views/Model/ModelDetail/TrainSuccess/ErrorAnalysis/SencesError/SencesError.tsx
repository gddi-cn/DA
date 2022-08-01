// import { useEffect, useState } from 'react'
import { SmallButton, TypeSettingBotton } from '@src/UIComponents'
import { isEmpty } from 'lodash'
import { useDeferredValue, useEffect, useState, useMemo } from 'react'
import TopErrorList from '../TopErrorList'
import { processEchartsData } from './processLabelArt'
import ListView from '../ListView'
import SlickView from '../SlickView'
import { objectToArray } from '../../utils'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './SencesError.module.less'

const SencesError = (props: any): JSX.Element => {
  const { data } = props
  const [dataList, setDataList] = useState<any[]>([])

  const [currentData, setCurrentData] = useState<any>({
    bbox: []
  })
  const [BboxList, setBboxList] = useState<any[]>([])
  const deferBboxList = useDeferredValue(BboxList)

  const [viewType, setViewType] = useState<string>('grid')

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  useEffect(() => {
    const list = processEchartsData(data)
    if (!isEmpty(list)) {
      const defaultValue = list[0]
      setCurrentData(defaultValue.data)
      const { bbox } = defaultValue.data
      setBboxList(objectToArray(bbox))
    }
    setDataList(list)
  }, [data])

  console.log(currentData)
  const handleonChange = (key:string) => {
    console.log(key)
    setViewType(key)
  }

  const selectError = (data:any) => {
    setCurrentData(data)
    const { bbox } = data
    setBboxList(objectToArray(bbox))
  }

  const view = useMemo(() => {
    const ReactComp: {
            [index: string]: React.ReactNode
        } = {

          grid: <ListView bboxList={deferBboxList} />,
          slick: <SlickView bboxList={deferBboxList} />,

        }
    if (isEmpty(deferBboxList)) {
      return null
    }
    return ReactComp[viewType] || null
  }, [deferBboxList, viewType])

  const handleGotoDataDetail = () => {
    socketPushMsgForProject(activePipeLine, {
      // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL,
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL
    })
  }

  return (
    <div styleName='SencesError'>
      <TopErrorList dataList={dataList} selectError={selectError} titleText={`TOP${dataList.length} 识别错误的场景`} />
      <div className='SencesError_wrap'>
        <div className='SencesError_view_headr'>
          <div className='advice'>
            该类需{currentData?.advice}
          </div>
          <div className='right_wrap'>
            <SmallButton type='nomal' onClick={handleGotoDataDetail}>补充数据</SmallButton>
            <TypeSettingBotton onChange={handleonChange}></TypeSettingBotton>
          </div>
        </div>
        <div className='SencesError_view_body'>
          {view}
        </div>
      </div>
    </div>
  )
}

export default SencesError
