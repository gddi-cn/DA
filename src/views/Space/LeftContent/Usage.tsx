import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

import watermark from '@src/asset/images/platform/watermark.png'
import { useUsage } from './hook'

import TrainTime from './TrainTime'

const Container = styled.div`
  margin-top: 20px;
  background: #EDF8FF;
  border-radius: 4px;
  padding: 20px 10px;
  position: relative;
`

const Watermark = styled.img`
  object-fit: contain;
  display: block;
  width: 104px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 4px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const DataDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  column-gap: 10px;
`

const Usage: React.FC = () => {
  const { loading } = useUsage()
  return (
    <Spin spinning={loading}>
      <Container>
        <Watermark src={watermark} alt={'watermark'} />
        <Title>使用情况</Title>
        <DataDisplay>
          <TrainTime />
        </DataDisplay>
      </Container>
    </Spin>
  )
}

export default Usage
