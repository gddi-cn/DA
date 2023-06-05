import React from 'react'
import styled from 'styled-components'

import { ReactComponent as APIIcon } from '@src/asset/icons/space/api.svg'
import { ReactComponent as APIActiveIcon } from '@src/asset/icons/space/api_active.svg'

import { useApi } from './hook'

const Container = styled.div`
  padding: 8px 10px;
  display: flex;
  column-gap: 10px;
  border-radius: 4px;
  transition: all ease-in-out 0.2s;
  margin-top: 4px;
  * {
    user-select: none;
  }
  &[selected] {
    background-color: #48A2DF;
    > p {
      color: #fff;
      font-weight: 600;
    }
  }
  &:hover:not([selected]) {
    background-color: #EDF8FF;
    cursor: pointer;
  }
  p {
    color: #061926;
  }
`

const Title = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  align-items: center;
`

const Api: React.FC = () => {
  const { active, handleClick, containerRef } = useApi()

  return (
    <Container ref={containerRef} onClick={handleClick}>
      {
        active ? <APIActiveIcon /> : <APIIcon />
      }
      <Title>API Key 管理</Title>
    </Container>
  )
}

export default Api

