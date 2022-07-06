import { ReactComponent as DownArrow } from './icon/chevron-down_minor.svg'

import { Select } from 'antd'
import api from '@api'
import Qs from 'qs'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { SetStateAction, Dispatch } from 'react'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import EditDataset from '../../../DataSetIndex/V1DatasetCard/EditDataset'
import './DatasetInfoHeader.module.less'

const { Option } = Select;
type Props={
    datasetInfo: Data,
    initFetchDatasetInfo:()=>void,
    setVersion: Dispatch<SetStateAction<any>>
}
const DatasetInfoHeader = (props:Props): JSX.Element => {
  const { datasetInfo, initFetchDatasetInfo, setVersion } = props

  const location = useLocation()
  const { search } = location
  const { id, version_id } = Qs.parse(search.substring(1))
  const [versionList, setVersionList] = useState<any[]>([])

  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const initFetch = async () => {
      try {
        if (id && version_id) {
          const path = `/v2/datasets/${id}/versions`
          const res = await api.get(path)
          if (res.code === 0) {
            const list = res.data || [];
            const target = (list as Array<any>).find((o) => o.id === version_id)

            if (target) {
              setValue(target.tag)
              setVersion(target)
            }
            setVersionList(list)
          }
        }
      } catch (e) {

      }
    }
    initFetch()
  }, [id, version_id, setVersion])

  const handleChange = (value: any, option: any) => {
    const data = option['data-value']

    console.log('selected', data);
    // 内部
    setValue(data.id)
    // 外部用
    setVersion(data)
  }

  return (
    <div styleName='DatasetInfoHeader' id='DatasetInfoHeader'>

      <div className='dataset_name'>
        {datasetInfo?.name}
      </div>
      <div className='point'>·</div>
      <div className='tag_wrap' id='area'>
        <Select value={value} onChange={handleChange} defaultValue="lucy" style={{ width: 'auto' }} bordered={false} suffixIcon={<DownArrow />} getPopupContainer={() => document.getElementById('area') as any} >

          {
            versionList.map((o: any) => {
              return <Option key={o.id || Math.random()} value={o.id} data-value={o}>{o.tag}</Option>
            })
          }
        </Select>

      </div>
      <EditDataset data={datasetInfo} type='nomal' eleId='root' callback={initFetchDatasetInfo} />
    </div>
  )
}

export default DatasetInfoHeader
