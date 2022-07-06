
import { TagRadioSelect, FooterBar, GButton } from '@src/UIComponents'
import DatasetList from './DatasetList'
import { MODEL_TYPES } from '@src/constants'
import './DataSetIndex.module.less'
import { useMemo, useRef, useState } from 'react'

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
      console.log(selectData)
    }
    return (
      <GButton style={{ width: 132 }} onClick={handleNext}>下一步</GButton>
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
