import React from 'react'
import styled from 'styled-components'

import readyLogo from '@src/asset/images/experience/ready.png'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

import { useReady } from './hook'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Img = styled.img`
  display: block;
  width: 260px;
  height: 200px;
  object-fit: contain;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  margin: 40px 0 0;
`

const Tip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin: 10px 0 20px;
  > span {
    color: #62b8e5;
  }
`

const Operations = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Ready: React.FC = () => {
  const { show, disabledCancel, url, disabledTry, handleCancel, hour, minute } = useReady()

  return show ? (
    <Container>
      <Img src={readyLogo} alt={'ready'} />
      <Title>当前设备可用</Title>
      <Tip>您还剩 <span>{hour}</span> 小时 <span>{minute}</span> 分钟的权限免费体验我们的部署，快来试试吧～</Tip>
      <Operations>
        <PrimaryBtn width={132} href={url} target={'_blank'} disabled={disabledTry}>试用</PrimaryBtn>
        <SecondaryBtn width={132} color={'error'} onClick={handleCancel} disabled={disabledCancel}>
          取消试用
        </SecondaryBtn>
      </Operations>
    </Container>
  ) : null
}

export default Ready
