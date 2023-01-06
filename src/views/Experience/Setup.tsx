import React from 'react'
import styled from 'styled-components'

import { useSetup } from './hook'
import loadingLogo from '@src/asset/images/g_loading.gif'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Img = styled.img`
  display: block;
  width: 375px;
  height: 300px;
  object-fit: contain;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  margin: 40px 0 0;
`
const SetUp: React.FC = () => {
  const { show } = useSetup()

  return show ? (
    <Container>
      <Img src={loadingLogo} alt={'setup'} />
      <Title>应用加载中...</Title>
    </Container>
  ) : null
}

export default SetUp

