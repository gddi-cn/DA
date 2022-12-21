import React from 'react'
import styled from "styled-components";

import { useFinish } from '../hook'

import pic from '../../assets/img/finish.png'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Img = styled.img`
  display: block;
  height: 200px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #19A051;
  margin-top: 40px;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 15px;
`

const DateWrap = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`

const FDate = styled.p`
  color: #62B0E5;
`

const EDate = styled.p`
  color: #061926;
`

const Finish: React.FC  = () => {
  const { finishDate, expectDate } = useFinish()

  return (
    <Container>
      <DateWrap>
        <EDate>
          预计完成时间：{expectDate}
        </EDate>
        <FDate>
          实际完成时间：{finishDate}
        </FDate>
      </DateWrap>
      <Img src={pic} alt={'abort'} />
      <Title>
        已完成标注
      </Title>
      <Text>
        数据集已完成标注您可以开始使用该数据集了！
      </Text>
    </Container>
  )
}

export default Finish