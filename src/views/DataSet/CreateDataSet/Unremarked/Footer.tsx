import React from 'react'
import { FooterBar } from '@src/UIComponents'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import styled from 'styled-components'

import { useFooter } from './hook'

const Right = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Footer: React.FC = () => {
  const { handlePre, handleNext, handleCancel, nextLabel, loading } = useFooter()

  return (
    <FooterBar
      leftContent={(
        <SecondaryBtn width={132} onClick={handleCancel}>取消</SecondaryBtn>
      )}
      rightContent={(
        <Right>
          <SecondaryBtn width={132} onClick={handlePre}>上一步</SecondaryBtn>
          <PrimaryBtn
            loading={loading}
            width={132}
            onClick={handleNext}
          >
            {nextLabel}
          </PrimaryBtn>
        </Right>
      )}
    />
  )
}

export default Footer
