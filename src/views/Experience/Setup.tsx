import React from 'react'
import styled from 'styled-components'

import { useSetup } from './hook'
import { Spin } from 'antd'

const Container = styled.div`
  display: flex;
  //flex-direction: column;
  align-items: center;
  column-gap: 16px;
`
const Title = styled.p`
  font-weight: 600;
  font-size: 22px;
  color: #061926;
`

const SetUp: React.FC = () => {
  const { show } = useSetup()

  return show ? (
    <Container>
      <Spin size={'large'} />
      <Title>应用加载中...</Title>
    </Container>
  ) : null
}

export default SetUp

