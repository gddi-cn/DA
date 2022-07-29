// import { ReactComponent as DownArrow } from './icon/chevron-down_minor.svg'

// import { Select } from 'antd'
// import api from '@api'

import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import type { SetStateAction, Dispatch } from 'react'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import EditDataset from '../../../DataSetIndex/V1DatasetCard/EditDataset'
import { SmallButton } from '@src/UIComponents'
import { APP_DATA_SET_INDEX, APP_IncreaseData } from '@router'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'

import './DatasetInfoHeader.module.less'

// const { Option } = Select;
type Props={
    datasetInfo: Data,
    initFetchDatasetInfo:()=>void,
    // setVersion: Dispatch<SetStateAction<any>>
}
const DatasetInfoHeader = (props:Props): JSX.Element => {
  const navigate = useNavigate()
  const { datasetInfo, initFetchDatasetInfo } = props

  // const location = useLocation()
  // const { search } = location
  // const { id, version_id } = Qs.parse(search.substring(1))
  // const [versionList, setVersionList] = useState<any[]>([])

  // const [value, setValue] = useState<string>('')

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  // useEffect(() => {
  //   const initFetch = async () => {
  //     try {
  //       const { APP_DATASET_DETAIL } = activePipeLine
  //       if (APP_DATASET_DETAIL?.id) {
  //         const { id, version_id } = APP_DATASET_DETAIL
  //         const path = `/v2/datasets/${id}/versions`
  //         const res = await api.get(path)
  //         if (res.code === 0) {
  //           const list = res.data || [];
  //           const target = (list as Array<any>).find((o) => o.id === version_id)

  //           if (target) {
  //             setValue(target.tag)
  //             setVersion(target)
  //           } else {
  //             const target = list[0]
  //             if (target) {
  //               setValue(target.tag)
  //               setVersion(target)
  //             }
  //           }
  //           setVersionList(list)
  //         }
  //       }
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   initFetch()
  // }, [activePipeLine, setVersion])

  // const handleChange = (value: any, option: any) => {
  //   const data = option['data-value']

  //   // 内部
  //   setValue(data.id)
  //   // 外部用
  //   setVersion(data)
  // }

  const handleGotoList = () => {
    navigate({
      pathname: APP_DATA_SET_INDEX
    })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,
      APP_DATASET_DETAIL: {}
    })
  }

  const handleGotoADDData = () => {
    // if (activePipeLine?.APP_MODEL_TRAIN_DETAIL?.id) {
    //   return null
    // }
    navigate({
      pathname: APP_IncreaseData
    })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_IncreaseData,
      // APP_DATASET_DETAIL: {}
    })
  }

  const showGoBackBtn = () => {
    if (activePipeLine?.APP_MODEL_TRAIN_DETAIL?.id) {
      return null
    }
    return (
      <SmallButton type='nomal' className='goback_wrap' onClick={handleGotoList}>返回数据列表</SmallButton>
    )
  }
  return (
    <div styleName='DatasetInfoHeader' id='DatasetInfoHeader'>

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
      <EditDataset data={datasetInfo} type='nomal' eleId='root' callback={initFetchDatasetInfo} />
      <SmallButton type='nomal' className='add_data_wrap' onClick={handleGotoADDData}>添加数据</SmallButton>
      {
        showGoBackBtn()
      }
    </div>
  )
}

export default DatasetInfoHeader
