import React from 'react'
import styled from 'styled-components'

import Progress from './Progress'
import { useStorage } from './hook'

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

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #48A2DF;
`

const Storage: React.FC = () => {
  const { tip, progress } = useStorage()
  return (
    <Container>
      <Title>储存空间</Title>
      <Progress progress={progress} />
      <Meta>
        <span>{tip}</span>
        <span>{progress}%</span>
      </Meta>
    </Container>
  )
}

export default Storage
