import React from 'react'

import { useInit } from './hook'

import Container from '../components/Container'
import LicenseList from './components/LicenseList'
import Apply from './components/Apply'

const CloudLicense: React.FC = () => {
  useInit()

  return (
    <Container>
      <LicenseList />
      <Apply />
    </Container>
  )
}

export default CloudLicense
