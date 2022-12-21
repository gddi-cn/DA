import React from 'react'
import styled from "styled-components";

import { useAbort } from '../hook'

import pic from '../../assets/img/abort.png'

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

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #FF6177;
  margin-top: 40px;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 10px;
`

const Reason = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 10px;
`

const Abort: React.FC  = () => {
  const { reason } = useAbort()

  return (
    <Container>
      <Img src={pic} alt={'abort'} />
      <Title>
        需求终止！
      </Title>
      <Text>
        请核查原因，删除任务。可重新提交需求。
      </Text>
      <Reason>
        原因：{reason}
      </Reason>
    </Container>
  )
}

export default Abort