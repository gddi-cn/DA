import React from 'react'
import styled from 'styled-components'

import empty from '@src/asset/images/space/no_device.png'

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Pic = styled.img`
  display: block;
  width: 332px;
  height: 200px;
  object-fit: cover;
`

const Title = styled.p`
  margin-top: 40px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const Tip = styled.p`
  margin-top: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
`

const Nodata: React.FC = () => {
  return (
    <Container>
      <Pic src={empty} alt='No Application' />
      <Title>暂无设备</Title>
      <Tip>暂无已注册设备，请先前往「设备中心」注册设备</Tip>
    </Container>
  )
}

export default Nodata

