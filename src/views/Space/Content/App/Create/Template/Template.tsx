import React from 'react'
import styled from 'styled-components'

import { useTemplate } from './hook'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import AddTemplate from './AddTemplate'
import Scrollbar from '@src/components/Scrollbar'
import { Spin } from 'antd'
import TemplateItem from './TemplateItem'

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

const ScrollWrap = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  padding: 15px 0;
`

const Content = styled.div`
  padding: 5px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 20px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
  padding: 20px 40px;
`

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, .01)
`

const Template: React.FC = () => {
  const { handlePre, handleCreate, loading, templateList, disabledNext, creating } = useTemplate()

  return (
    <Container>
      <Header>
        <Title>选择模板</Title>
        <AddTemplate />
      </Header>
      <ScrollWrap>
        {
          loading ? (
            <LoadingWrap>
              <Spin spinning />
            </LoadingWrap>
          ) : null
        }
        <Scrollbar autoHide>
          <Content>
            {
              templateList.map(template => (
                <TemplateItem {...template} key={template.id} />
              ))
            }
          </Content>
        </Scrollbar>
      </ScrollWrap>
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

