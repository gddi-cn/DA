
import { TagRadioSelect, FooterBar, GButton } from '@src/UIComponents'
import DatasetList from './DatasetList'
import { MODEL_TYPES, SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useMemo, useRef, useState } from 'react'
import { isEmpty, isNil } from 'lodash'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_ANALYSE } from '@router'

import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './DataSetIndex.module.less'

const dataList:{label:string, id:string}[] = [
  { label: '全部类型', id: 'all' }
]

for (const [k, v] of Object.entries(MODEL_TYPES)) {
  dataList.push(
    {
      label: v,
      id: k
    }
  )
}

const DataSetIndex = (): JSX.Element => {
  const paramsChangeAndFetch = useRef<any>(null)

  const navigate = useNavigate()

  const [selectData, setSelectData] = useState<any>({})

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const handleOnChange = (data:any) => {
    let _id = data.id
    if (_id === 'all') {
      _id = undefined
    }

    if (paramsChangeAndFetch.current) {
      paramsChangeAndFetch.current({ scene: _id }, { isInit: true })
    }
  }

  const FooterRightView = () => {
    const handleNext = () => {
      if (isEmpty(selectData) || isNil(selectData)) {
        message.warning('请选择数据集')
      }
      // const search = Qs.stringify({ id: selectData?.id, version_id: selectData?.latest_version?.id })
      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_ANALYSE,
          APP_DATASET_ANALYSE: { id: selectData?.id }
        }
      )
      navigate({
        pathname: APP_DATASET_ANALYSE,
        // search: search
      })
    }
    return (
      <GButton type='primary' className={isEmpty(selectData) || isNil(selectData) ? 'not_allow' : 'yes_sir'} style={{ width: 132 }} onClick={handleNext}>下一步</GButton>
    )
  }

  return (
    <div styleName='DataSetIndex' className='maxWidthAuto' >

      <div className='dataset_list_header'>
        <TagRadioSelect dataList={dataList} onChange={handleOnChange} value="all"/>
      </div>

      <div className='dataset_list_wrap'>
        {
          useMemo(() => {
            return (
              <DatasetList ref={paramsChangeAndFetch} setSelectData={setSelectData} />
            )
          }, [])
        }
      </div>
      <FooterBar rightContent={<FooterRightView/>}/>
    </div>
  )
}

export default DataSetIndex
