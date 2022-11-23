import React from 'react'
import styled from 'styled-components'

import Header from './TableHeader'
import Body from './TableBody'

const Container = styled.div`
  //width: 784px;
  //max-width: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`

const LicenseTable: React.FC = () => {
  return (
    <Container>
      <Header />
      <Body />
    </Container>
  )
}

export default LicenseTable
