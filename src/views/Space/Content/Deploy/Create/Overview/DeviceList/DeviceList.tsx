import React from 'react'
import styled from 'styled-components'

import Row from './Row'
import { useDeviceList } from './hook'

const gridTemplate = '6fr 6fr 4fr 6fr 4fr 1fr'

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-top: 40px;
`

const ListHeader = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 4px;
`

const HeaderCell = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const RowWrap = styled.div`
  > div:not(:last-of-type) {
    border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  }
`

const SubTitle = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin: 20px 0 6px;
  &::before {
    display: inline-block;
    content: '*';
    color: #FF4D4F;
    margin-right: 4px;
  }
`

const DeviceList: React.FC = () => {
  const { deviceList } = useDeviceList()

  return (
    <>
      <Title>下发设备</Title>
      <ListHeader>
        <HeaderCell>设备名称</HeaderCell>
        <HeaderCell>设备 SN</HeaderCell>
        <HeaderCell>AI 芯片类型</HeaderCell>
        <HeaderCell>注册时间</HeaderCell>
        <HeaderCell>设备状态</HeaderCell>
        <HeaderCell></HeaderCell>
      </ListHeader>
      <RowWrap>
        {
          deviceList.map(device => <Row key={device.id} {...device} />)
        }
      </RowWrap>
    </>
  )
}

export default DeviceList

