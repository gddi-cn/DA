import React from 'react'
import styled from 'styled-components'

import { useLeftContent } from './hook'
import Usage from './Usage'
import Account from './Account'
import Device from './Device'
// import App from './App'
// import Deploy from './Deploy'

const Container = styled.div`
  padding: 4px 24px;
`

const LeftTitle = styled.p<{ mt?: number }>`
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
  color: #061926;
  margin-top: ${p => p.mt ? p.mt + 'px' : undefined};
`

const Divider = styled.hr`
  margin: 12px 0;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid #EDF8FF;
  width: 100%;
`

const LeftContent: React.FC = () => {
  const {greeting, username} = useLeftContent()
  return (
    <Container>
      <LeftTitle>{greeting}</LeftTitle>
      <LeftTitle mt={10}>{username}</LeftTitle>
      <Usage />
      <Account />
      <Divider />
      <Device />
    </Container>
  )
}

export default LeftContent
