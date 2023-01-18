import React from 'react'

import { useContent } from './hook'

import Usage from './Usage'
import Account from './Account'
import Device from './Device'

const Content: React.FC = () => {
  const { showUsage, showAccount, showDevice } = useContent()
  return (
    <>
      { showUsage ? <Usage /> : null }
      { showAccount ? <Account /> : null }
      { showDevice ? <Device /> : null }
    </>
  )
}

export default Content
