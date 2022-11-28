import React from 'react'
import styled from 'styled-components'

import chipEmpty from '@src/asset/images/empty/chipEmpty.png'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Img = styled.img`
  display: block;
  object-fit: contain;
  width: 268px;
  height: 260px;
`

const Tip = styled.p`
  margin-top: 40px;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const NoData: React.FC = () => {
  return (
    <Container>
      <Img src={chipEmpty} alt={'No Data'} />
      <Tip>未找到该芯片</Tip>
    </Container>
  )
}

export default NoData
