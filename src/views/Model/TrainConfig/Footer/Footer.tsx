import React from 'react'
import styled from 'styled-components'

import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

import { useFooter } from './hook'
import {FooterBar} from "@src/UIComponents";
import {useBack2DatasetIndex} from "@src/hooks/task";

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

const LeftActions: React.FC = () => {
  const handleCancel = useBack2DatasetIndex()

  return (
    <SecondaryBtn width={132} onClick={handleCancel}>取消</SecondaryBtn>
  )
}

const RightActions: React.FC = () => {
  const { label, disabledNext, handleGoBack, loading, handleTrain } = useFooter()

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
          {label}
        </PrimaryBtn>
      </Right>
    </Container>
  )
}

const Footer: React.FC = () => {
  return (
    <FooterBar
      leftContent={<LeftActions />}
      rightContent={<RightActions />}
    />
  )
}

export default Footer
