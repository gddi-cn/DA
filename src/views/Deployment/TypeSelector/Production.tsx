import React from 'react'
import styled from 'styled-components'

import ItemCard from './ItemCard'
import { DeployType } from '@src/shared/enum/deploy'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.div`
  background-color: #edf8ff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 20px;
`

const Production: React.FC = () => {
  return (
    <Container>
      <Content>
        <ItemCard type={DeployType.SDK} />
        <ItemCard type={DeployType.EXPERIENCE} />
      </Content>
    </Container>
  )
}

export default Production

