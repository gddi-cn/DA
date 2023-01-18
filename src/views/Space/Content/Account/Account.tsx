import React from 'react'
import styled from 'styled-components'


import UserAvatar from './UserAvatar'
import UserName from './Username'
import NickName from './NickName'
import Email from './Email'
import Password from './Password'

const Container = styled.div`
  height: 100%;
  background: #EDF8FF;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  width: 436px;
  max-width: 100%;
  row-gap: 40px;
`

const LinkWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`


const Account: React.FC = () => {
  return (
    <Container>
      <Content>
        <UserAvatar />
        <UserName />
        <NickName />
        <Email />
        <LinkWrap>
          <Password />
        </LinkWrap>
      </Content>
    </Container>
  )
}

export default Account
