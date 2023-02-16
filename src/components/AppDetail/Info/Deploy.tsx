import React from 'react'
import styled from 'styled-components'

import { useDeploy } from './hook'
import noSync from '../images/no_sync.png'
import { formatUnixTime } from '@src/utils/tools'

const gridTemplate = '2fr 1.5fr 1.5fr 3fr'

const bgMapping = {
  Done: '#19A051',
  InProgress: '#2582C1',
  Failure: '#FF6177',
}

const labelMapping = {
  Done: '下发完成',
  InProgress: '下发中',
  Failure: '下发失败',
}

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #061926;
`

const ImgWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const Img = styled.img`
  display: block;
  width: 260px;
  height: 200px;
  object-fit: contain;
`

const ListWrap = styled.div`
  width: 100%;
  margin-top: 10px;
`

const ListHeader = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  display: grid;
  grid-template-columns: ${gridTemplate};
`

const HeaderCell = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #061926;
`

const RowWrap = styled.div`
  > div:not(:last-of-type) {
    border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  }
`

const Row = styled.div`
  padding: 10px 12px;
  display: grid;
  grid-template-columns: ${gridTemplate};
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, .02);
  }
`

const RowCell = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DeployTime = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #606266;
`

const StatusBar = styled.div<{bg?: React.CSSProperties['backgroundColor']}>`
  background-color: ${props => props.bg || '#ccc'};
  color: #fff;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  width: 80px;
  text-align: center;
`

const DeviceCount = styled.p<{ color?: React.CSSProperties['color'] }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.color || '#061926'};
`

const SyncDeviceDetail = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`

const Line = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #606266;
`

const SyncList: React.FC<{
  recordList: Array<App.Sync.Record>
  onClick(record: App.Sync.Record): void
}> = (
  {
    recordList,
    onClick
  }
) => {
  return (
    <ListWrap>
      <ListHeader>
        <HeaderCell>下发时间</HeaderCell>       
        <HeaderCell>下发状态</HeaderCell>       
        <HeaderCell>设备总数</HeaderCell>       
        <HeaderCell>设备下发状态</HeaderCell>       
      </ListHeader>
      <RowWrap>
        {
          recordList.map(record => (
            <Row key={record.id} onClick={() => onClick(record)}>
              <RowCell>
                <DeployTime>{formatUnixTime(record.create_time)}</DeployTime>
              </RowCell>
              <RowCell>
                <StatusBar
                  bg={
                    record.sync_state === 'Done' && record.failed_count > 0
                      ? '#FAD514'
                      : bgMapping[record.sync_state]
                  }
                >
                  { labelMapping[record.sync_state] || '未知' }
                </StatusBar>
              </RowCell>
              <RowCell>
                <DeviceCount>
                  {record.total || '--'}
                </DeviceCount>
              </RowCell>
              <RowCell>
                <SyncDeviceDetail>
                  <DeviceCount color={bgMapping['Done']}>
                    {record.success_count} 成功
                  </DeviceCount>
                  <Line>|</Line>
                  <DeviceCount color={bgMapping['Failure']}>
                    {record.failed_count} 失败
                  </DeviceCount>
                  <Line>|</Line>
                  <DeviceCount color={bgMapping['InProgress']}>
                    {record.pending_count} 等待中
                  </DeviceCount>
                </SyncDeviceDetail>
              </RowCell>
            </Row>
          ))
        }
      </RowWrap>
    </ListWrap>
  )
}

const Deploy: React.FC = () => {
  const { recordList, handleClick } = useDeploy()

  return (
    <Container>
      <Title>下发历史记录</Title>
      {
        recordList?.length ? (
          <SyncList recordList={recordList} onClick={handleClick} />
        ) : (
          <ImgWrap>
            <Img src={noSync} alt="no sync record" />
          </ImgWrap>
        )
      }
    </Container>
  )
}

export default Deploy

