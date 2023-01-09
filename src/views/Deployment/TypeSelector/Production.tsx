import React from 'react'
import styled from 'styled-components'

import ItemCard from './ItemCard'
import { DeployType } from '@src/shared/enum/deploy'
import { useTypeSelector } from './hook'

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
  const { disabledTrial } = useTypeSelector()

  return (
    <Container>
      <Content>
        <ItemCard type={DeployType.EXPERIENCE} disabled={disabledTrial} />
        <ItemCard type={DeployType.PLATFORM} />
        <ItemCard type={DeployType.SDK} />
      </Content>
    </Container>
  )
}

export default Production

