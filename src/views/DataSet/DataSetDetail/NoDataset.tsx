import React from 'react'
import { styled } from '@mui/material'

import empty from '@src/asset/images/empty/chipEmpty.png'

const Container = styled('div')`
  height: calc(100vh - 100px);
  overflow: hidden;
  display: grid;
  place-items: center;
`

const Content = styled('div')`
  
`

const Img = styled('img')`
  display: block;
  width: 400px;
  height: 300px;
  object-fit: contain;
`

const Tip = styled('p')`
  font-size: 18px;
  text-align: center;
  margin: 16px 0;
`

const NoDataset: React.FC = () => {
  return (
    <Container>
      <Content>
        <Img src={empty} />
        <Tip>该模型没有数据集</Tip>
      </Content>
    </Container>
  )
}

export default NoDataset
