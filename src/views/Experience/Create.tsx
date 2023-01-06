import React from 'react'
import styled from 'styled-components'

import { useCreate } from './hook'
import createLogo from '@src/asset/images/experience/create.png'
import { PrimaryBtn } from '@src/components/Button'

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
`

const Create: React.FC = () => {
  const { show, handleCreate } = useCreate()

  return show ? (
    <Container>
      <Img src={createLogo} alt={'no record'} />
      <Title>暂无试用记录</Title>
      <Tip>快点击下方按钮，体验部署你的模型吧～</Tip>
      <PrimaryBtn width={132} onClick={handleCreate}>创建试用</PrimaryBtn>
    </Container>
  ) : null
}

export default Create
