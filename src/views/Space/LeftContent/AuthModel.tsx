import React from 'react'
import styled from 'styled-components'

import { useAuthModel } from './hook'

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

const Meta = styled.p`
  margin-top: 4px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #48A2DF;
  letter-spacing: 4px;
  span {
    font-size: 12px;
    font-weight: 500;
  }
`

const AuthModel: React.FC = () => {
  const { usaged } = useAuthModel()
  return (
    <Container>
      <Title>模型授权</Title>
      <Meta>
        { usaged }<span>个</span>
      </Meta>
    </Container>
  )
}

export default AuthModel
