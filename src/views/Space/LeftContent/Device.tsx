import React from 'react'
import styled from 'styled-components'

import { ReactComponent as DeviceIcon } from '@src/asset/icons/space/device.svg'

import { useDevice } from './hook'

const Container = styled.div`
  padding: 8px 10px;
  display: flex;
  column-gap: 10px;
  border-radius: 4px;
  transition: all ease-in-out 0.2s;
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
      line, rect {
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

const Device: React.FC = () => {
  const { handleClick, containerRef } = useDevice()
  return (
    <Container ref={containerRef} onClick={handleClick}>
      <DeviceIcon />
      <Title>设备中心</Title>
    </Container>
  )
}

export default Device
