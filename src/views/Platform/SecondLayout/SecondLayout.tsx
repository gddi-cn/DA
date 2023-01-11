import React from 'react'
import styled from 'styled-components'

import Meta from './Meta'
import DeviceGroupSelector from './DeviceGroupSelector'

import Config from '../Config'
import SelectDevice from '../SelectDevice'

import { useSecondLayout } from './hook'

const Container = styled.div`
  padding-top: 40px;
  display: flex;
  column-gap: 20px;
  width: 1198px;
  height: 100%;
  overflow: hidden;
`

const Left = styled.div`
  width: 208px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const Right = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: #EDF8FF;
  border-radius: 8px;
  padding: 10px;
`

const SecondLayout: React.FC = () => {
  const { showConfig, showSelectDevice } = useSecondLayout()

  return (
    <Container>
      <Left>
        <Meta />
        <DeviceGroupSelector />
      </Left>
      <Right>
        {
          showConfig ? <Config /> : null
        }
        {
          showSelectDevice ? <SelectDevice /> : null
        }
      </Right>
    </Container>
  )
}

export default SecondLayout
