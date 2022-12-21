import React from 'react'
import styled from "styled-components";

import { SubTitle } from '../components'

import { useDetail } from './hook'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ChildWrap = styled.div`
  flex: 1;
`

const Detail: React.FC = () => {
  const child = useDetail()

  return (
    <Container>
      <SubTitle>进度详情</SubTitle>
      <ChildWrap>
        {
          child
        }
      </ChildWrap>
    </Container>
  )
}

export default Detail
