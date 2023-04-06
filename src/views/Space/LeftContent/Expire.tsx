import React from 'react'
import styled from 'styled-components'

import { useExprie } from './hook'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`

const Title = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
`

const ExpireDate = styled.p`
  color: #48A2DF;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
`

const Expire: React.FC = () => {
  const { date } = useExprie()

  return (
    <Container>
      <Title>到期日期</Title>
      <ExpireDate>{date}</ExpireDate>
    </Container>
  )
}

export default Expire
