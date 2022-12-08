import React from 'react'

import empty from './empty.png'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 160px;
`

const Image = styled.img`
  display: block;
  object-fit: contain;
  width: 200px;
  height: 200px;
`

const Title = styled.h5`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  text-align: center;
  margin: 40px 0 0;
`

const Tip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  text-align: center;
  margin-top: 10px;
`

const NoData: React.FC = () => {
  return (
    <Container>
      <Image alt={'empty'} src={empty} />
      <Title>错误分析生成中</Title>
      <Tip>暂无错误分析，请耐心等待</Tip>
    </Container>
  )
}

export default NoData
