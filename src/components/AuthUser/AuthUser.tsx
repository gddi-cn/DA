import React from 'react'
import { Avatar as AntAvatar, Popover as AntPopover } from 'antd'
import styled from 'styled-components'

import { useAuthUser } from './hook'
import defaultAvatar from '@src/asset/images/defaultAvatar.png'
import { HoverBtn } from '@src/components/Button'

const AvatarWrap = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Avatar = styled(AntAvatar)<{ bg?: React.CSSProperties['color'], cursor?: React.CSSProperties['cursor'] }>`
  background-color: ${props => props.bg || '#fff'};
  cursor: ${props => props.cursor || 'normal'};
`

const Container = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 28px;
`

const Popover = styled(AntPopover)`
  padding: 0;
  .ant-popover-inner {
    border-radius: 8px;
  }
`

const Username = styled.p`
  margin-top: 10px;
  font-weight: 500;
  font-size: 18px;
  color: #061926;
`

const Mobile = styled.p`
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #BFBFBF;
`

const SpaceWrap = styled.div`
  margin-top: 22px;
  width: 100%;
`

const Divider = styled.hr`
  margin: 12px 0;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid #EDF8FF;
  width: 100%;
`

const Content: React.FC = () => {
  const { avatar, username, mobile, toSpace, logout } = useAuthUser()

  return (
    <Container>
      <Avatar src={avatar || defaultAvatar} size={60} bg={'#EDF8FF'} />
      <Username>{username}</Username>
      <Mobile>{mobile}</Mobile>
      <SpaceWrap>
        <HoverBtn width={'100%'} onClick={toSpace}>个人中心</HoverBtn>
      </SpaceWrap>
      <Divider />
      <HoverBtn width={'100%'} bg={'#ffeeee'} color={'#FF6177'} onClick={logout}>退出登录</HoverBtn>
    </Container>
  )
}

const AuthUser: React.FC = () => {
  const { avatar } = useAuthUser()

  return (
    <>
      <AvatarWrap>
        <Popover placement={'bottomRight'} content={<Content />} trigger={'click'}>
          <Avatar src={avatar || defaultAvatar} size={32} cursor={'pointer'} />
        </Popover>
      </AvatarWrap>
    </>
  )
}

export default AuthUser
