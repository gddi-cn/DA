import React from 'react'
import { FooterBar } from '@src/UIComponents'
import { SecondaryBtn } from '@src/components/Button'

import { useFooter } from './hook'

const Footer: React.FC = () => {
  const { handleClick } = useFooter()

  return (
    <FooterBar rightContent={<SecondaryBtn width={132} onClick={handleClick}>上一步</SecondaryBtn>} />
  )
}

export default Footer
