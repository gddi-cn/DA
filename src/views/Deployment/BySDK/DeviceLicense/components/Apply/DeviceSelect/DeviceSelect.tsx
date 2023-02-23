import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import GroupDeviceList from './GroupDeviceList'
import Footer from './Footer'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`

const DeviceSelect: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <GroupDeviceList />
      </Content>
      <Footer />
    </Container>
  )
}

export default DeviceSelect
