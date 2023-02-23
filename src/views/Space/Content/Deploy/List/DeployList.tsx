import React from 'react'
import styled from 'styled-components'
import { Pagination } from 'antd'

import CreateBtn from './CreateBtn'
import Scrollbar from '@src/components/Scrollbar'
import { useDeployList } from './hook'
import moment from 'moment'
import { lighten } from 'polished'

const gridTemplate = '2fr 2fr 3fr 3fr'

const bgMapping = {
  Done: '#19A051',
  InProgress: '#2582C1',
  Failure: '#FF6177',
}

const Container = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 40px;
`

const ScrollWrap = styled.div`
  flex: 1;
  overflow: hidden;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 40px;
`

const ListHeader = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 4px;
  margin: 0 40px;
`

const HeaderCell = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #061926;
`

const RowWrap = styled.div`
  padding: 0 40px;
  > div:not(:last-of-type) {
    border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  }
`

const Row = styled.div`
  padding: 10px 12px;
  display: grid;
  grid-template-columns: ${gridTemplate};
  cursor: pointer;
  column-gap: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, .02);
  };
`

const RowCell = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CreateTime = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #606266;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Total = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #62B0E5;
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

const Progress = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`

const StatusBar = styled.div<{
  percent: number;
  bg: React.CSSProperties['backgroundColor']}
>`
  background-color: ${props => `${lighten(0.3, props.bg as string)}`};
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  width: 140px;
  text-align: center;
  height: 8px;
  position: relative;
  &::before {
    display: block;
    content: "";
    position: absolute;
    border-radius: 8px;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${props => props.percent + '%'};
    background-color: ${props => props.bg}
  }
`

const Percent = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
`


const DeployList: React.FC = () => {
  const {
    syncList, page,
    pageSize, total,
    handleChange, handleClick,
  } = useDeployList()

  return (
    <Container>
      <Header>
        <CreateBtn />
      </Header>
      <ListHeader>
        <HeaderCell>部署时间</HeaderCell>
        <HeaderCell>设备总数</HeaderCell>
        <HeaderCell>部署状态</HeaderCell>
        <HeaderCell>部署进度</HeaderCell>
      </ListHeader>
      <ScrollWrap>
        <Scrollbar autoHide>
          <RowWrap>
            {
              syncList.map((sync) => {
                const {
                  id, create_time, total,
                  success_count, failed_count,
                  pending_count, sync_state,
                } = sync
                const percent =
                  total === 0
                  ? 100
                  : Math.round((total - pending_count) * 100 / total)

                return (
                  <Row key={id} onClick={() => handleClick(sync)}>
                    <CreateTime>
                      {
                        create_time
                          ? moment(new Date(create_time * 1000)).format('YYYY-MM-DD HH:mm')
                          : '--'
                      }
                    </CreateTime>
                    <Total>{total}</Total>
                    <RowCell>
                      <SyncDeviceDetail>
                        <DeviceCount color={bgMapping['Done']}>
                          {success_count} 成功
                        </DeviceCount>
                        <Line>|</Line>
                        <DeviceCount color={bgMapping['Failure']}>
                          {failed_count} 失败
                        </DeviceCount>
                        <Line>|</Line>
                        <DeviceCount color={bgMapping['InProgress']}>
                          {pending_count} 等待中
                        </DeviceCount>
                      </SyncDeviceDetail>
                    </RowCell>
                    <Progress>
                      <StatusBar
                        percent={percent}
                        bg={
                          sync_state === 'Done' && failed_count > 0
                            ? '#FAD514'
                            : bgMapping[sync_state]
                        }
                      />
                      <Percent>{percent}%</Percent>
                    </Progress>
                  </Row>
                )}
              )
            }
          </RowWrap>
        </Scrollbar>
      </ScrollWrap>
      <Footer>
        <Pagination
          current={page}
          pageSize={pageSize}
          onChange={handleChange}
          total={total}
          showTotal={(t) => `共 ${t} 条记录`}
          size={'small'}
        />
      </Footer>
    </Container>
  )
}

export default DeployList

