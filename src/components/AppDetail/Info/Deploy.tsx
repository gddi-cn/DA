import React from 'react'
import styled from 'styled-components'

import { useDeploy } from './hook'
import noSync from '../images/no_sync.png'

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #061926;
`

const ImgWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const Img = styled.img`
  display: block;
  width: 260px;
  height: 200px;
  object-fit: contain;
`

const Deploy: React.FC = () => {
  const { recordList } = useDeploy()

  return (
    <Container>
      <Title>下发历史记录</Title>
      {
        recordList?.length ? (
          <>123</>
        ) : (
          <ImgWrap>
            <Img src={noSync} alt="no sync record" />
          </ImgWrap>
        )
      }
    </Container>
  )
}

export default Deploy

