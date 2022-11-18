import  React from 'react'

import {
  Container
} from '../components'
import { useInit } from './hook'
import LicenseList from './components/LicenseList'
import Apply from './components/Apply'

const DeviceLicense: React.FC = () => {
  useInit()

  return (
    <Container>
      <LicenseList />
      <Apply />
    </Container>
  )
}

export default DeviceLicense
