import React from 'react'
import styled from 'styled-components'

import { FooterBar } from '@src/UIComponents'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

import { useFooter } from './hook'

const Right = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Footer: React.FC = () => {
  const { handlePre, handleNext, nextLabel, disabledNext, loading } = useFooter()

  return (
    <FooterBar
      rightContent={(
        <Right>
          <SecondaryBtn width={132} onClick={handlePre}>上一步</SecondaryBtn>
          <PrimaryBtn width={132} loading={loading} onClick={handleNext} disabled={disabledNext}>{nextLabel}</PrimaryBtn>
        </Right>
      )}
    />
  )
}

export default Footer
