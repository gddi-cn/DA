import React from 'react'
import styled from 'styled-components'

import { ReactComponent as DeployIcon } from '@src/asset/icons/space/deploy.svg'
import { ReactComponent as DeployActiveIcon } from '@src/asset/icons/space/deploy_active.svg'

import { useDeploy } from './hook'

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
      rect {
        stroke: #FFF;
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
  const { active, handleClick, containerRef } = useDeploy()

  return (
    <Container ref={containerRef} onClick={handleClick}>
      {
        active ? <DeployActiveIcon /> : <DeployIcon />
      }
      <Title>应用部署</Title>
    </Container>
  )
}

export default App

