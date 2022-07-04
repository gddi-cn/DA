import DatasetBaseInfoForm from '../CreateDataSet/LocalDataSet/DatasetBaseInfoForm'
import { TagRadioSelect } from '@src/UIComponents'
import './DataSetIndex.module.less'

const DataSetIndex = (props: any): JSX.Element => {
  console.log(props, '??')
  const a = [1, 2, 3, 4]
  return (
    <div styleName='DataSetIndex'>
      <DatasetBaseInfoForm/>
      <TagRadioSelect dataList={a}/>
    </div>
  )
}

export default DataSetIndex
