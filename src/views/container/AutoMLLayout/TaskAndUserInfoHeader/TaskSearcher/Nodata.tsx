import React from 'react'
import styled from 'styled-components'

import empty from './img/project_empty.png'

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
`

const Img = styled.img`
  display: block;
  width: 260px;
  height: 200px;
  object-fix: containe;
`

const Tip = styled.div`
  color: #061926;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
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

