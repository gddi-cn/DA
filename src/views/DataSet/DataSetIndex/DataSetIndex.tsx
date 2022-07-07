
import { TagRadioSelect, FooterBar, GButton } from '@src/UIComponents'
import DatasetList from './DatasetList'
import { MODEL_TYPES } from '@src/constants'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Qs from 'qs'
import { APP_DATASET_DETAIL } from '@router'
import './DataSetIndex.module.less'
import { isEmpty, isNil } from 'lodash'
import { message } from 'antd'

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
  const navigate = useNavigate()

  const paramsChangeAndFetch = useRef<any>(null)

  const [selectData, setSelectData] = useState<any>({})
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
        return
      }
      const search = Qs.stringify({ id: selectData?.id, version_id: selectData?.latest_version?.id })
      navigate({
        pathname: APP_DATASET_DETAIL,
        search: search
      })
    }
    return (
      <GButton className={isEmpty(selectData) || isNil(selectData) ? 'not_allow' : 'yes_sir'} style={{ width: 132 }} onClick={handleNext}>下一步</GButton>
    )
  }

  return (
    <div styleName='DataSetIndex' className='maxWidthAuto' >

      <div className='dataset_list_header'>
        <TagRadioSelect dataList={dataList} onChange={handleOnChange} />
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
