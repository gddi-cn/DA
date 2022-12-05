import React from 'react'
import { FooterBar } from '@src/UIComponents'
import { PrimaryBtn } from '@src/components/Button'

import { useFooter } from './hook'

const Footer: React.FC = () => {
  const { handleClick, disabled } = useFooter()

  return (
    <FooterBar rightContent={(
      <PrimaryBtn width={132} onClick={handleClick} disabled={disabled}>
        去训练
      </PrimaryBtn>
    )}/>
  )
}

export default Footer
