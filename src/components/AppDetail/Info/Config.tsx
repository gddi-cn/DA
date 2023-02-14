import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

import { useConfig } from './hook'
import { ReactComponent as RightIcon } from '../icons/right.svg'
import { ReactComponent as ChipIcon } from '../icons/chip.svg'
import { formatUnixTime } from '@src/utils/tools'
import noModel from '../images/no_model.png'

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #061926;
`

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  column-gap: 6px;
`

const ModelTitle = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const ModelListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(209px, 1fr));
  gap: 20px;
  margin-top: 10px;
`

const ModelContainer = styled.div`
  background: #EDF8FF;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  overflow: hidden;
`

const ModelHeader = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
  overflow: hidden;
`

const ModelName = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  font-weight: 600;
  font-size: 14px;
  color: #061926;
`

const ModelCreated = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  padding-left: 24px;
  color: #8C8C8C;
`

const ImgWrap = styled.div`
  width: 100%;
  margin-top: 31px;
  display: flex;
  justify-content: center;
`

const Img = styled.img`
  display: block;
  width: 187.5px;
  height: 150px;
  object-fit: contain;
`

const Config: React.FC = () => {
  const { modelList } = useConfig()

  // mock data for test
  // modelList.push(...[
  //   { id: 1, name: 'test_1', create_time: Date.now() / 1000 | 0 },
  //   { id: 2, name: 'test_2', create_time: Date.now() / 1000 | 0 },
  //   { id: 3, name: 'test_3', create_time: Date.now() / 1000 | 0 },
  // ])

  return (
    <Container>
      <Header>
        <Title>关键参数</Title>
        <Btn icon={<RightIcon />} type='text' size='large'>
          详情
        </Btn>
      </Header>
      {
        modelList.length ? (
          <>
            <ModelTitle>应用模型</ModelTitle>
            <ModelListWrap>
              {
                modelList.map(model => (
                  <ModelContainer key={model.id}>
                    <ModelHeader>
                      <ChipIcon />
                      <ModelName title={model.name}>{model.name}</ModelName> 
                    </ModelHeader>
                    <ModelCreated>{formatUnixTime(model.create_time)}</ModelCreated>
                  </ModelContainer>
                ))
              }
            </ModelListWrap>
          </>
        ) : (
          <ImgWrap>
            <Img src={noModel} alt='no model' />
          </ImgWrap>
        )
      }
    </Container>
  )
}

export default Config

