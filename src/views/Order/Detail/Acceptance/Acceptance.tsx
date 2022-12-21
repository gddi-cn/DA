import React from 'react'
import styled from "styled-components";

import pic from '../../assets/img/acceptance.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Img = styled.img`
  display: block;
  height: 200px;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 40px;
`

const Acceptance: React.FC  = () => {
  return (
    <Container>
      <Img src={pic} alt={'abort'} />
      <Text>
        当前处于审核验收阶段，请耐心等待结果
      </Text>
    </Container>
  )
}

export default Acceptance