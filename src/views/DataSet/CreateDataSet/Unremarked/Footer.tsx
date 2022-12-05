import React from 'react'
import { FooterBar } from '@src/UIComponents'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import styled from 'styled-components'

const Right = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`
const Footer: React.FC = () => {
  return (
    <FooterBar
      leftContent={<SecondaryBtn width={132}>取消</SecondaryBtn>}
      rightContent={(
        <Right>
          <SecondaryBtn width={132}>上一步</SecondaryBtn>
          <PrimaryBtn width={132}>下一步</PrimaryBtn>
        </Right>
      )}
    />
  )
}

export default Footer
