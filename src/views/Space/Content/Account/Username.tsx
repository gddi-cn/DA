import { authUserInfoAtom } from '@src/store/user'
import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 32px;
  width: 100%;
  display: flex;
  column-gap: 20px;
  align-items: flex-start;
`

const Label = styled.p`
  width: 45px;
  text-align: justify;
  text-align-last: justify;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #202223;
`

const Content = styled.div`
  flex-grow: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #202223;
`

const UserName: React.FC = () => {
  const [userInfo] = useAtom(authUserInfoAtom)

  return (
    <Container>
      <Label>用户名</Label>
      <Content>{userInfo?.username || '-'}</Content>
    </Container>
  )
}

export default UserName
