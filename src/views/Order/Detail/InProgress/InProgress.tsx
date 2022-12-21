import React from 'react'
import styled from "styled-components";

import { useInProgress } from '../hook'

import pic from '../../assets/img/progress.png'
import ProgressChart from './ProgressChart'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const ImgWrap = styled.div`
  height: 169px;
  position: absolute;
  bottom: 57px;
  right: 98px;
  left: 98px;
  user-select: none;
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  object-fit: contain;
`

const Meta = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #061926;
  }
`

const InProgress: React.FC  = () => {
  const { name, expectDate, total, done } = useInProgress()

  return (
    <Container>
      <Meta>
        <p>
          标注任务：{name}
        </p>
        <p>
          预计完成时间：{expectDate}
        </p>
      </Meta>
      <ProgressChart total={total} done={done} />
      <ImgWrap>
        <Img src={pic} alt={'abort'} />
      </ImgWrap>
    </Container>
  )
}

export default InProgress
