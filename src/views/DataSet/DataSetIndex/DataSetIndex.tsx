import DatasetBaseInfoForm from '../CreateDataSet/LocalDataSet/DatasetBaseInfoForm'
import { TagRadioSelect } from '@src/UIComponents'
import './DataSetIndex.module.less'

const DataSetIndex = (props: any): JSX.Element => {
  console.log(props, '??')
  const a = [{ label: '检测', id: '1' }, { label: '分类', id: '2' }, { label: '姿态检测', id: '3' }, { label: '单目3D', id: '4' }]
  const handleOnChange = (data:any) => {
    console.log(data)
  }
  return (
    <div styleName='DataSetIndex'>
      <DatasetBaseInfoForm/>
      <TagRadioSelect dataList={a} onChange={handleOnChange}/>
    </div>
  )
}

export default DataSetIndex
