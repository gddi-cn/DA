import React from 'react'
import styled from 'styled-components'

import { usePending } from './hook'
import pendingLogo from '@src/asset/images/experience/pending.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Img = styled.img`
  display: block;
  width: 342px;
  height: 200px;
  object-fit: contain;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  margin: 40px 0 0;
  > span {
    color: #62b0e5;
  }
`

const Tip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin: 10px 0 20px;
`
const Pending: React.FC = () => {
  const { show, left } = usePending()

  return show ? (
    <Container>
      <Img src={pendingLogo} alt={'pending'} />
      <Title>目前还有 <span>{left}</span> 位用户在等待试用 </Title>
      <Tip>等待设备空闲，我们将以短信形式通知您，请注意查收短信，感谢您的耐心!</Tip>
    </Container>
  ) : null
}

export default Pending
