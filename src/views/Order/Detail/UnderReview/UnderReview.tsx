import React from 'react'
import styled from "styled-components";

import pic from '../../assets/img/underReview.png'

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

const UnderReview: React.FC = () => {
  return (
    <Container>
      <Img src={pic} alt={'under review'} />
      <Text>
        当前处于需求确认阶段，请等待工作人员将与您沟通需求细节
      </Text>
    </Container>
  )
}

export default UnderReview