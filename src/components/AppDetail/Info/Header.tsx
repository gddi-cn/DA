import React from 'react'
import styled from 'styled-components'

import { useHeader } from './hook'
import Edit from './Edit'
import More from './More'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 36px;
  color: #061926;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Toolbars = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Header: React.FC = () => {
  const { name } = useHeader()
  return (
    <Container>
      <Title title={name}>{name}</Title>
      <Toolbars>
        <Edit />
        <More />
      </Toolbars>
    </Container>
  )
}

export default Header

