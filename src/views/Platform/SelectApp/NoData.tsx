import React from 'react'
import styled from 'styled-components'

import appListEmpty from '@src/asset/images/platform/app_list_empty.png'

const Container = styled.div`
  margin: 40px 20px 0;
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 533px;
  background: #EDF8FF;
  border-radius: 8px;
`

const Img = styled.img`
  display: block;
  width: 260px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 40px;
`

const Title = styled.p`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const Tip = styled.p`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
`

const NoData: React.FC = () => {
  return (
    <Container>
      <Img  src={appListEmpty} alt={'No Data'}/>
      <Title>无已创建应用</Title>
      <Tip>目前暂无创建任何应用，快点左边按钮创建吧</Tip>
    </Container>
  )
}

export default NoData
