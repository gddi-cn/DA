import React from 'react'
import styled from 'styled-components'

import empty from './img/project_empty.png'

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  align-items: center;
`

const Img = styled.img`
  display: block;
  width: 325px;
  height: 250px;
  object-fix: containe;
`

const Tip = styled.div`
  color: #061926;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
`

const Nodata: React.FC = () => {
  return (
    <Container>
      <Img alt='no data' src={empty} />
      <Tip>暂无数据</Tip>
    </Container>
  )
}

export default Nodata

