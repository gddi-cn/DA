import React from 'react'
import styled from 'styled-components'

import { useDevice } from './hook'
import { TabsHeader } from '@src/UIComponents'
import Terminal from './Terminal'
import Edge from './Edge'
import { DeviceType } from '@src/shared/enum/device'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  transition: border-radius 0.2s ease-in-out;
  &[terminal] {
    border-top-left-radius: 0;
  }
`

const navList =  [
  {
    label: '应用设备',
    primaryKey: DeviceType.EDGE,
    icon: <></>
  },
  {
    label: 'SDK 设备',
    primaryKey: DeviceType.TERMINAL,
    icon: <></>,
  },
]

const Device: React.FC = () => {
  const { handleTabChange, contentRef, showTerminal, showEdge }  = useDevice()

  return (
    <Container>
      <TabsHeader
        dataList={navList}
        handleChangeTab={handleTabChange}
        defualtActiveKey={DeviceType.EDGE}
      />
      <Content ref={contentRef}>
        { showTerminal? <Terminal /> : null }
        { showEdge ? <Edge /> : null }
      </Content>
    </Container>
  )
}

export default Device
