import React from 'react'

import { useContent } from './hook'

import Usage from './Usage'
import Account from './Account'
import Device from './Device'
import App from './App'
import Deploy from './Deploy'

const Content: React.FC = () => {
  const { showUsage, showAccount, showDevice, showApp, showDeploy } = useContent()
  return (
    <>
      { showUsage ? <Usage /> : null }
      { showAccount ? <Account /> : null }
      { showDevice ? <Device /> : null }
      { showApp ? <App /> : null }
      { showDeploy ? <Deploy /> : null }
    </>
  )
}

export default Content
