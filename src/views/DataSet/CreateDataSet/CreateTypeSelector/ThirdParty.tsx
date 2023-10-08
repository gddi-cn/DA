import React from 'react'
import styled from 'styled-components'

import LittleTypeItem from './LittleTypeItem'
import { DatasetCreateType } from '@src/shared/enum/dataset'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 44px;
  color: #62B0E5;
`

const Content = styled.div`
  background-color: #edf8ff;
  border-radius: 8px;
  padding: 20px;
  height: 488px;
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const ThirdParty: React.FC = () => {
  return (
    <Container>
      <Title>第三方服务</Title>
      <Content>
        <LittleTypeItem type={DatasetCreateType.IMPORT_THIRD_PARTY} />
        <LittleTypeItem type={DatasetCreateType.UPLOAD_UNREMARKED} />
      </Content>
    </Container>
  )
}

export default ThirdParty
