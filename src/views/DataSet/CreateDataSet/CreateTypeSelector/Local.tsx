import React from 'react'
import styled from 'styled-components'
import TypeItem from './TypeItem'
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
  display: flex;
  gap: 20px;
`
const Local: React.FC = () => {
  return (
    <Container>
      <Title>本地上传</Title>
      <Content>
        <TypeItem type={DatasetCreateType.UPLOAD_UNREMARKED} />
        <TypeItem type={DatasetCreateType.UPLOAD_REMARKED} />
      </Content>
    </Container>
  )
}

export default Local
