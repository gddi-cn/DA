import React from 'react'
import { Button as AntButton } from 'antd'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { stepAtom } from '@views/Deployment/BySDK/DeviceLicense/components/Apply/store'


const Button = styled(AntButton)`
  background-color: transparent;
  border-color: #061926;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-style: normal;
  text-align: center;
  padding: 5px 20px;
  color: #061926;
  &:hover, &:focus {
    background-color: transparent;
    border-color: #061926;
    color: #061926;
  }
`

const DeviceRegisterBtn: React.FC = () => {
  const [, setStep] = useAtom(stepAtom)

  return (
    <Button onClick={() => setStep('register')}>
      注册设备
    </Button>
  )
}

export default DeviceRegisterBtn
