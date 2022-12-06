import DatasetInfoHeader from './DatasetInfoHeader'
import { useMemo } from 'react'

import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import BaseInfo from './BaseInfo'
import { APP_DATA_SET_INDEX } from '@router'
import type { Dispatch, SetStateAction } from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@reducer/index'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './DatasetInfo.module.less'

type Props = {
  whichSet: string,
  setClassInfo: Dispatch<SetStateAction<string>>,
  classInfo: any,
  datasetInfo: Data | null,
  initFetchDatasetInfo: () => Promise<void>,
  // version:any,
  // setVersion: Dispatch<SetStateAction<string>>,
  currentSet: any,

}

const DatasetInfo = (props: Props): JSX.Element => {
  const { whichSet, setClassInfo, classInfo, datasetInfo, initFetchDatasetInfo, currentSet } = props
  const navigate = useNavigate()
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const handleGotoList = () => {
    navigate({
      pathname: APP_DATA_SET_INDEX
    })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,
      APP_DATASET_DETAIL: {}
    })
  }
  const showGoBackBtn = () => {
    if (activePipeLine?.APP_MODEL_TRAIN_DETAIL?.id) {
      return null
    }
    return (
      <div className='go_back'>
        <div onClick={handleGotoList}><LeftOutlined />返回数据集列表</div>
      </div>
    )
  }

  return (
    <div styleName='DatasetInfo'>
      {showGoBackBtn()}
      <div className='DatasetInfo_wrap'>
        {
          useMemo(() => (
            <DatasetInfoHeader datasetInfo={datasetInfo || {} as Data} initFetchDatasetInfo={initFetchDatasetInfo} />
          ), [datasetInfo, initFetchDatasetInfo])
        }
        {
          useMemo(() => (
            <BaseInfo
              // version={version}
              currentSet={currentSet}
              datasetInfo={datasetInfo || {} as Data}
              whichSet={whichSet}
              setClassInfo={setClassInfo}
              classInfo={classInfo}
            />
          ), [classInfo, setClassInfo, currentSet, whichSet, datasetInfo])
        }
      </div>
    </div>
  )
}

export default DatasetInfo
