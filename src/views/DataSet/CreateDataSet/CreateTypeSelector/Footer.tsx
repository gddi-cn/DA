import React from 'react'

import { FooterBar } from '@src/UIComponents'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { useFooter } from './hook'

const Footer: React.FC = () => {
  const { disabled, handleCancel, handleNext } = useFooter()
  return (
    <FooterBar
      leftContent={(
        <SecondaryBtn width={132} onClick={handleCancel}>取消</SecondaryBtn>
      )}
      rightContent={(
        <PrimaryBtn width={132} disabled={disabled} onClick={handleNext}>
          下一步
        </PrimaryBtn>
      )}
    />
  )
}

export default Footer
