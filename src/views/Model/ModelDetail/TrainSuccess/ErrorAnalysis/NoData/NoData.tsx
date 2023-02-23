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
      <Tip>该类型无相关类别的错误</Tip>
    </Container>
  )
}

export default NoData
