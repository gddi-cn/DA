import React from 'react'
import styled from 'styled-components'

import Box from '@src/components/Box'
import { SecondaryBtn } from '@src/components/Button'

import { useDeploy } from './hook'
import Scrollbar from '@src/components/Scrollbar'
import { ReactComponent as FilterAllIcon } from '../icons/filter_all.svg'
import { ReactComponent as FilterSuccessIcon } from '../icons/filter_success.svg'
import { ReactComponent as FilterPendingIcon } from '../icons/filter_pending.svg'
import { ReactComponent as FilterFailIcon } from '../icons/filter_fail.svg'
import noDevice from '../images/no_deploy_device.png'
import { groupDeviceStateColorMapping, groupDeviceStateNameMapping } from '@src/shared/mapping/device'
import { formatUnixTime } from '@src/utils/tools'

const gridTemplate = '2fr 3fr 2fr 1fr 2fr 1fr 1fr'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Created = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8C8C8C;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ScrollWrap = styled.div`
  height: 100%;
  over-flow: hidden;
`

const Content = styled.div`
  padding: 0 40px;
`

const SubTitle = styled.p<{ mt?: React.CSSProperties['marginTop']}>`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin-top: ${props => props.mt || 'unset'};
`

const FilterWrap = styled.div`
  margin-top: 10px;
  display: flex;
  column-gap: 20px;
`

const FilterItem = styled.div<{ bg?: React.CSSProperties['backgroundColor'], oc?: React.CSSProperties['outlineColor'] }>`
  border-radius: 4px;
  background-color: ${props => props.bg || 'unset'};
  width: 147px;
  padding: 10px;
  display: flex;
  column-gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: box-shadow ease-in .1s;
  &:hover:not([selected]) {
    box-shadow: 1px 2px 4px rgba(177, 191, 202, 0.36);
  }
  &[selected] {
    outline: 2px solid ${props => props.oc || '#48A2DF'};
  }
`

const FilterConent = styled.div<{ color?: React.CSSProperties['color']}>`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  p {
    &:first-of-type {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #061926;
    }
    &:last-of-type {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: ${props => props.color || 'rgba(0, 0, 0, .85)'};
    }

  }
`

const bgMapping = {
  Done: '#eaf5ee',
  InProgress: '#eff8ff',
  Failure: '#fdf1f2',
}

const colorMapping = {
  Done: '#19A051',
  InProgress: '#2582C1',
  Failure: '#FF6177',
}

const labelMapping = {
  All: '全部设备',
  Done: '部署成功',
  InProgress: '部署中',
  Failure: '部署失败',
}

const ListWrap = styled.div`
  width: 100%;
  margin-top: 20px;
`

const ListHeader = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 2px;
`

const HeaderCell = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
`

const RowCell = styled.div<{ color?: React.CSSProperties['color'] }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  column-gap: 2px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.color || '#606266'};
`

const EmptyWrap = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Empty = styled.img`
  width: 195px;
  height: 150px;
  display: block;
  object-fit: cover;
`

const EmptyTip = styled.p`
  margin-top: 20px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
`

const DeviceList: React.FC<{ deviceList: Device.SyncInstance[] }> = (
  {
    deviceList,
  }
) => {
  return (
    <>
      <ListHeader>
        <HeaderCell>设备名称</HeaderCell>
        <HeaderCell>设备 SN</HeaderCell>
        <HeaderCell>AI 芯片型号</HeaderCell>
        <HeaderCell>设备状态</HeaderCell>
        <HeaderCell>注册时间</HeaderCell>
        <HeaderCell>路数配置</HeaderCell>
        <HeaderCell>部署状态</HeaderCell>
      </ListHeader>
      <RowWrap>
        {
          deviceList.map(device => (
            <Row key={device.id}>
              <RowCell title={device.name}>{ device.name }</RowCell>
              <RowCell title={device.sn}>{ device.sn }</RowCell>
              <RowCell title={device.chip}>{ device.chip }</RowCell>
              <RowCell
                color={groupDeviceStateColorMapping.get(device.state)}
              >
                { groupDeviceStateNameMapping.get(device.state) || '未知' }
              </RowCell>
              <RowCell>
                { formatUnixTime(device.create_time) || '--' }
              </RowCell>
              <RowCell>6</RowCell>
              <RowCell color={colorMapping[device.sync_state]}>
                {labelMapping[device.sync_state]}
              </RowCell>
            </Row>
          ))
        }
      </RowWrap>
    </>
  )
}

const Deploy: React.FC = () => {
  const {
    handleClose,
    created,
    total,
    pending_count,
    success_count,
    failed_count,
    allRef,
    successRef,
    pendingRef,
    failRef,
    handleClick,
    deviceList,
  } = useDeploy()

  return (
    <Box
      noScroll
      header={(
        <Header>
          <Title>下发详情</Title>
          <Created>{created}</Created>
        </Header>
      )}
      footer={(
        <Footer>
          <SecondaryBtn width={97} onClick={handleClose}>返回详情</SecondaryBtn>
        </Footer>
      )}
    >
      <ScrollWrap>
        <Scrollbar autoHide>
          <Content>
            <SubTitle>设备概览</SubTitle>
            <FilterWrap>
              <FilterItem
                ref={allRef}
                bg={bgMapping['InProgress']}
                onClick={() => handleClick('All')}
              >
                <FilterAllIcon />
                <FilterConent color={colorMapping['InProgress']}>
                  <p>{labelMapping['All']}</p>
                  <p>{total || 0}</p>
                </FilterConent>
              </FilterItem>
              <FilterItem
                ref={successRef}
                bg={bgMapping['Done']}
                onClick={() => handleClick('Done')}
                oc={colorMapping['Done']}
              >
                <FilterSuccessIcon />
                <FilterConent
                  color={colorMapping['Done']}
                  onClick={() => handleClick('Done')}
                >
                  <p>{labelMapping['Done']}</p>
                  <p>{success_count || 0}</p>
                </FilterConent>
              </FilterItem>
              <FilterItem
                ref={pendingRef}
                bg={bgMapping['InProgress']}
                onClick={() => handleClick('InProgress')}
              >
                <FilterPendingIcon />
                <FilterConent color={colorMapping['InProgress']}>
                  <p>{labelMapping['InProgress']}</p>
                  <p>{pending_count || 0}</p>
                </FilterConent>
              </FilterItem>
              <FilterItem
                ref={failRef}
                bg={bgMapping['Failure']}
                onClick={() => handleClick('Failure')}
                oc={colorMapping['Failure']}
              >
                <FilterFailIcon />
                <FilterConent color={colorMapping['Failure']}>
                  <p>{labelMapping['Failure']}</p>
                  <p>{failed_count || 0}</p>
                </FilterConent>
              </FilterItem>
            </FilterWrap>
            <SubTitle mt={'40px'}>
              设备下发详情
            </SubTitle>
            {
              deviceList?.length ? (
                <ListWrap>
                  <DeviceList deviceList={deviceList} />
                </ListWrap>
              ) : (
                <EmptyWrap>
                  <Empty src={noDevice} alt='no device' />
                  <EmptyTip>暂无记录</EmptyTip>
                </EmptyWrap>
              )
            }
          </Content>
        </Scrollbar>
      </ScrollWrap>
    </Box>
  )
}

export default Deploy

