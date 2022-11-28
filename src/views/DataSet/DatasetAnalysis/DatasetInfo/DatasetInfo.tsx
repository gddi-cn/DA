// import { Select } from 'antd'
// import { ReactComponent as DownArrow } from '@src/views/DataSet/DataSetDetail/DatasetInfo/DatasetInfoHeader/icon/chevron-down_minor.svg'
import EditDataset from '@src/views/DataSet/DataSetIndex/V1DatasetCard/EditDataset'
import moment from 'moment'
import './DatasetInfo.module.less'
import { Image, Typography } from 'antd'
import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import datasetDefault from '@src/asset/images/datasetDefault.png'
import { bytesToSize } from '@src/utils'
import { sceneNameMapping } from '@src/shared/mapping/dataset'
import { DatasetScene } from '@src/shared/enum/dataset'

type Props ={
    datasetInfo: Data,
    initFetchDatasetInfo:any,
}

const DatasetInfo: React.FC<Props> = (
  {
    datasetInfo,
    initFetchDatasetInfo,
  }
) => {
  return (
    <div styleName='DatasetInfo'>
      <Typography.Title level={5} className='dataset_info_title'>
        数据信息
      </Typography.Title>
      <hr className='hr' />
      <div className='dataset_info_wrap'>
        <div className='name_and_version'>
          <div className='dataset_name'>
            {datasetInfo?.name}
          </div>
          <div className='point'>·</div>
        </div>
        <EditDataset data={datasetInfo} type='nomal' eleId='root' callback={initFetchDatasetInfo} />
      </div>
      <div className="dataset-info-cover">
        <Image src={datasetInfo?.cover} fallback={datasetDefault} />
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
      <hr className='hr' />
      <div className='dataset_info_block'>
        <div className='dataset_info_block_item'>
          <p>数据类型：</p>
          <p>{datasetInfo?.scene ? sceneNameMapping.get(datasetInfo.scene as DatasetScene) : '--'}</p>
        </div>
        <div className='dataset_info_block_item'>
          <p>数据大小：</p>
          <p>{datasetInfo?.train_set?.size ? bytesToSize(datasetInfo?.train_set?.size) : '--'}</p>
        </div>
        <div className='dataset_info_block_item'>
          <p>数据量：</p>
          <p>{datasetInfo?.train_set?.image_count || '--'}</p>
        </div>
        <div className='dataset_info_block_item'>
          <p>标注数：</p>
          <p>{datasetInfo?.train_set?.annotation_count || '--'}</p>
        </div>
        <div className='dataset_info_block_item'>
          <p>标签种类：</p>
          <p>{datasetInfo?.train_set?.class_count || '--'}</p>
        </div>
      </div>
    </div>
  )
}

export default DatasetInfo
