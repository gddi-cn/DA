import React from 'react'
import styled from 'styled-components'

import { useUsage } from './hook'
import Filter from './Filter'
import List from './List'

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  color: #2582C1;
`


const Usage: React.FC = () => {
  useUsage()

  return (
    <Container>
      <Title>历史记录</Title>
      <Filter />
      <List />
    </Container>
  )
}

export default Usage
