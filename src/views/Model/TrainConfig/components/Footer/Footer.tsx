import React from 'react'
import styled from 'styled-components'

import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

import { useFooter } from './hook'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Footer: React.FC = () => {
  const { disabledNext, handleGoBack, loading, handleTrain } = useFooter()

  return (
    <Container>
      <Right>
        <SecondaryBtn width={132} onClick={handleGoBack}>上一步</SecondaryBtn>
        <PrimaryBtn
          width={132}
          disabled={disabledNext}
          loading={loading}
          onClick={handleTrain}
        >
          开始训练
        </PrimaryBtn>
      </Right>
    </Container>
  )
}

export default Footer
