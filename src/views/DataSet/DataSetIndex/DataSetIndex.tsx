import DatasetBaseInfoForm from '../CreateDataSet/LocalDataSet/DatasetBaseInfoForm'
import './DataSetIndex.module.less'

const DataSetIndex = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='DataSetIndex'>
      <DatasetBaseInfoForm/>
    </div>
  )
}

export default DataSetIndex
