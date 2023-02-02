import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import EditDataset from '../../../DataSetIndex/V1DatasetCard/EditDataset'
import { SmallButton } from '@src/UIComponents'
import { APP_IncreaseData } from '@src/router'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'

import Download from './Download'
import ImportHistory from './ImportHistory'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  column-gap: 8px;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`

const Name = styled.p`
  margin: 0 4px 0 0;
`

type Props={
    datasetInfo: Data,
    initFetchDatasetInfo:()=>void,
}
const DatasetInfoHeader = (props:Props): JSX.Element => {
  const navigate = useNavigate()
  const { datasetInfo, initFetchDatasetInfo } = props

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const handleGotoADDData = () => {
    navigate({
      pathname: APP_IncreaseData
    })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_IncreaseData,
    })
  }

  return (
    <Container>
      <Left>
        <Name>
          {datasetInfo?.name}
        </Name>
        <EditDataset data={datasetInfo} type='nomal' eleId='root' callback={initFetchDatasetInfo} />
        <SmallButton type='nomal' className='add_data_wrap' onClick={handleGotoADDData}>添加数据</SmallButton>
        <Download {...datasetInfo} refresh={initFetchDatasetInfo} />
      </Left>
      <Right>
        <ImportHistory {...datasetInfo} />
      </Right>
    </Container>
  )
}

export default DatasetInfoHeader
