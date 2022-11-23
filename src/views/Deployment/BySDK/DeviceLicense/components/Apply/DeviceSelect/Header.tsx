import React from 'react'
import styled from 'styled-components'
import DeviceGroupSelector from './DeviceGroupSelector'
import DeviceRegisterBtn from './DeviceRegisterBtn'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Header: React.FC = () => {
  return (
    <Container>
      <DeviceGroupSelector />
      <div style={{ marginLeft: 20 }}>
        <DeviceRegisterBtn />
      </div>
    </Container>
  )
}

export default Header
