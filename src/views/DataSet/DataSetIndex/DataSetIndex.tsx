
import { TagRadioSelect, FooterBar, GButton } from '@src/UIComponents'
import DatasetList from './DatasetList'
import { MODEL_TYPES } from '@src/constants'
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
  const handleOnChange = (data:any) => {
    console.log(data)
  }

  const FooterRightView = () => {
    return (
      <GButton style={{ width: 132 }}>下一步</GButton>
    )
  }
  return (
    <div styleName='DataSetIndex' className='maxWidthAuto'>

      <div className='dataset_list_header'>
        <TagRadioSelect dataList={dataList} onChange={handleOnChange} />
      </div>

      <div className='dataset_list_wrap'>
        <DatasetList/>
      </div>
      <FooterBar rightContent={<FooterRightView/>}/>
    </div>
  )
}

export default DataSetIndex
