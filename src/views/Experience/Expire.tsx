import React from 'react'
import styled from 'styled-components'

import expireLogo from '@src/asset/images/experience/expire.png'
import { PrimaryBtn } from '@src/components/Button'
import { useExpire } from './hook'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Img = styled.img`
  display: block;
  width: 320px;
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

const Expire: React.FC = () => {
  const { show, disabled, loading, handleCreate } = useExpire()

  return show ? (
    <Container>
      <Img src={expireLogo} alt={'expired'} />
      <Title>当前试用已失效</Title>
      <Tip>抱歉！当前试用已经失效，点击下方按钮重新申请试用</Tip>
      <PrimaryBtn disabled={disabled} loading={loading} onClick={handleCreate}>重新申请</PrimaryBtn>
    </Container>
  ) : null
}

export default Expire
