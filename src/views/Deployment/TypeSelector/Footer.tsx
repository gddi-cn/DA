import React from 'react'

import { useFooter } from './hook'
import { FooterBar } from '@src/UIComponents'
import { PrimaryBtn } from '@src/components/Button'

const Footer: React.FC = () => {
  const { disabled, handleClick } = useFooter()

  return (
    <FooterBar
      rightContent={<PrimaryBtn disabled={disabled} width={132} onClick={handleClick}>下一步</PrimaryBtn>}
    />
  )
}

export default Footer
