import React from 'react'
import styled from 'styled-components'

import empty from '@src/asset/images/empty/chipEmpty.png'
import DeviceItem from './DeviceItem'

const EmptyWrap = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EmptyPic = styled.img`
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

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(147px, 170px));
  gap: 20px;
  margin-top: 20px;
`

const Empty: React.FC = () => {
  return (
    <EmptyWrap>
      <EmptyPic src={empty} alt='no record' />
      <EmptyTip>暂无记录</EmptyTip>
    </EmptyWrap>
  )
}

const DeviceList: React.FC<{ deviceList: Device.SyncInstance[] }> = (
  {
    deviceList,
  }
) => {
  return deviceList.length ? (
    <Container>
      {
        deviceList.map(device => (
          <DeviceItem key={device.id} {...device} />
        ))
      }
    </Container>
  ) : <Empty />
}

export default DeviceList

