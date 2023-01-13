import React from 'react'

import { useTrainTime } from './hook'

import Progress from './Progress'
import styled from 'styled-components'

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

const TrainTime: React.FC = () => {
  const { tip, progress } = useTrainTime()

  return (
    <Container>
      <Title>训练时长</Title>
      <Progress progress={progress} />
      <Meta>
        <span>{tip}</span>
        <span>{progress}%</span>
      </Meta>
    </Container>
  )
}

export default TrainTime
