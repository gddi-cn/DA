import React from 'react'
import styled from 'styled-components'

import { SecondaryBtn, PrimaryBtn } from '@src/components/Button'
import TemplateList from '@src/components/TemplateList'
import AddTemplate from './AddTemplate'
import { useTemplate } from './hook'

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
  padding: 36px 0 0;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Content = styled.div`
  margin-top: 20px;
  flex: 1;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
  padding: 20px 40px;
`

const Template: React.FC = () => {
  const {
    handlePre, creating,
    handleCreate, disabledNext,
    template, handleChange, 
  } = useTemplate()

  return (
     <Container>
      <Header>
        <Title>选择模板</Title>
        <AddTemplate />
      </Header>
      <Content>
        <TemplateList
          template={template || undefined}
          onChange={handleChange}
        />
      </Content>
      <Footer>
        <SecondaryBtn width={97} onClick={handlePre} disabled={creating}>
          上一步
        </SecondaryBtn>
        <PrimaryBtn width={97} onClick={handleCreate} disabled={disabledNext} loading={creating}>
          创建
        </PrimaryBtn>
      </Footer>
    </Container>
  )
}

export default Template

