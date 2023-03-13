import React from 'react'
import DatasetInfoHeader from './DatasetInfoHeader'
import BaseInfo from './BaseInfo'
import { APP_DATA_SET_INDEX } from '@router'
import { LeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@reducer/index'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './DatasetInfo.module.less'

const DatasetInfo = (): JSX.Element => {
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

  const memoedChild = React.useMemo(() => (
    <div className='DatasetInfo_wrap'>
      <DatasetInfoHeader />
      <BaseInfo />
    </div>
  ), [])

  return (
    <div styleName='DatasetInfo'>
      {showGoBackBtn()}
      {memoedChild}
    </div>
  )
}

export default DatasetInfo
