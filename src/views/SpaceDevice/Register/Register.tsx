import React from 'react'

import { useRegister } from './hook'
import DeviceRegister from '@src/components/DeviceRegister'

const Register: React.FC = () => {
  const {
    getDefaultGroup,
    onRegist,
  } = useRegister()

  return (
    <DeviceRegister
      primary
      getDefaultGroup={getDefaultGroup}
      onRegist={onRegist}
    />
  )
}

export default Register
