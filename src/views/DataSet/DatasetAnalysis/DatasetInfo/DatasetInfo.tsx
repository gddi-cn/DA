// import { Select } from 'antd'
// import { ReactComponent as DownArrow } from '@src/views/DataSet/DataSetDetail/DatasetInfo/DatasetInfoHeader/icon/chevron-down_minor.svg'
import EditDataset from '@src/views/DataSet/DataSetIndex/V1DatasetCard/EditDataset'
import moment from 'moment'
import './DatasetInfo.module.less'

// const { Option } = Select

type Props ={
    datasetInfo:any,

    initFetchDatasetInfo:any,

}
const DatasetInfo = (props: Props): JSX.Element => {
  const { datasetInfo, initFetchDatasetInfo } = props
  console.log(datasetInfo, 'datasetInfo')
  return (
    <div styleName='DatasetInfo'>
      <div className='dataset_title'>
              数据信息
      </div>
      <div className='dataset_info_wrap'>
        <div className='name_and_version'>
          <div className='dataset_name'>
            {datasetInfo?.name}
          </div>
          <div className='point'>·</div>
          {/* <div className='tag_wrap' id='area'>
            <Select value={value} onChange={handleChange} style={{ width: 'auto' }} bordered={false} suffixIcon={<DownArrow />} getPopupContainer={() => document.getElementById('area') as any} >

              {
                versionList.map((o: any) => {
                  return <Option key={o.id || Math.random()} value={o.id} data-value={o}>{o.tag}</Option>
                })
              }
            </Select>

          </div> */}
        </div>
        <EditDataset data={datasetInfo} type='nomal' eleId='root' callback={initFetchDatasetInfo} />
      </div>
      <div className='dataset_info_block'>
        <div className='dataset_info_block_item'>
          <p>创建人：</p>
          <p>{datasetInfo?.username || ''}</p>
        </div>

        <div className='dataset_info_block_item'>
          <p>创建时间：</p>
          <p>{moment(datasetInfo?.created * 1000).format('YYYY/MM/DD')}</p>
        </div>

        <div className='dataset_info_block_item'>
          <p>更新时间：</p>
          <p>{moment(datasetInfo?.updated * 1000).format('YYYY/MM/DD')}</p>
        </div>
      </div>
    </div>
  )
}

export default DatasetInfo
