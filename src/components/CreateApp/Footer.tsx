import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import React from 'react'
import styled from 'styled-components'
import { useFooter } from './hook'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 40px 20px;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

export interface FooterProps {
  onCancel: () => void
  onCreate: (app: App.Instance) => void
}

const Footer: React.FC<FooterProps> = (
  {
    onCreate,
    onCancel,
  }
) => {
  const {
    base, loading,
    handleCancel, handlePre,
    handleNext, handleCreate,
  } = useFooter(onCreate, onCancel)

  return (
    <Container>
      <SecondaryBtn width={97} onClick={handleCancel}>取消</SecondaryBtn>
      <FooterRight>
        {
          base ? (
            <PrimaryBtn width={97} onClick={handleNext}>下一步</PrimaryBtn>
          ) : (
            <>
              <SecondaryBtn width={97} onClick={handlePre}>上一步</SecondaryBtn>
              <PrimaryBtn width={97} onClick={handleCreate} loading={loading}>创建</PrimaryBtn>
            </>
          )
        }
      </FooterRight>
    </Container>
  )
}

export default Footer

