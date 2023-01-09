import React from 'react'
import { FooterBar } from '@src/UIComponents'
import { SecondaryBtn } from '@src/components/Button'

import { useFooter } from './hook'

const Footer: React.FC = () => {
  const { handlePre } = useFooter()
  return (
    <FooterBar
      rightContent={(
        <SecondaryBtn width={132} onClick={handlePre}>上一步</SecondaryBtn>
      )}
    />
  )
}

export default Footer
