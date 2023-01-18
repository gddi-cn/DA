import React from 'react'
import styled from 'styled-components'

import { ReactComponent as AccountIcon } from '@src/asset/icons/space/account.svg'

import { useAccount } from './hook'

const Container = styled.div`
  margin-top: 40px;
  padding: 8px 10px;
  display: flex;
  column-gap: 10px;
  border-radius: 4px;
  transition: all ease-in-out 0.2s;
  * {
    user-select: none;
  }
  &[selected] {
    background-color: #48A2DF;
    > p {
      color: #fff;
      font-weight: 600;
    }
    > svg {
      circle {
        stroke: #fff;
      }
      path {
        fill: #fff;
      }
    }
  }
  &:hover:not([selected]) {
    background-color: #EDF8FF;
    cursor: pointer;
  }
  p {
    color: #061926;
  }
`

const Title = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  align-items: center;
`

const Account: React.FC = () => {
  const { handleClick, containerRef } = useAccount()
  return (
    <Container ref={containerRef} onClick={handleClick}>
      <AccountIcon />
      <Title>个人账户</Title>
    </Container>
  )
}

export default Account
