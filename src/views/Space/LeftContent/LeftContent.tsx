import React from 'react'
import styled from 'styled-components'

import { useLeftContent } from './hook'
import Usage from './Usage'

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

const LeftContent: React.FC = () => {
  const {greeting, username} = useLeftContent()
  return (
    <Container>
      <LeftTitle>{greeting}</LeftTitle>
      <LeftTitle mt={10}>{username}</LeftTitle>
      <Usage />
    </Container>
  )
}

export default LeftContent
