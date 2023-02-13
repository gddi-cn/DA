import React from 'react'
import styled from 'styled-components'

import { ReactComponent as AppIcon } from '@src/asset/icons/space/app.svg'
import { ReactComponent as AppActiveIcon } from '@src/asset/icons/space/app_active.svg'

import { useApp } from './hook'

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
    > svg {
      path {
        stroke: #fff;
      }
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

const App: React.FC = () => {
  const { active, handleClick, containerRef } = useApp()

  return (
    <Container ref={containerRef} onClick={handleClick}>
      {
        active ? <AppActiveIcon /> : <AppIcon />
      }
      <Title>应用管理</Title>
    </Container>
  )
}

export default App

