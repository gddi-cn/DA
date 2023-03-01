import React from 'react'
import styled from 'styled-components'

import { useCreateApp } from './hook'
import EmptyDialog from '@src/components/EmptyDialog'

import BaseForm from './BaseForm'
import SelecteTemplate from './SelectTemplate'
import Footer from './Footer'

const Container = styled.div`
  height: calc(80vh - 120px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.div`
  margin-top: 40px;
  padding: 0 40px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`

const CreateApp: React.FC = () => {
  const {
    open,
    handleCancel,
    step,
  } = useCreateApp()

  return (
    <EmptyDialog
      open={open}
      onCancel={handleCancel}
      showCloseBtn
      destroyOnClose
    >
      <Container>
        <Header>
          {step === 'base' ? '应用信息' : '选择模板'}
        </Header>
        <Content>
          { step === 'base' ? <BaseForm /> : null }
          { step === 'template' ? <SelecteTemplate /> : null }
        </Content>
        <Footer />
      </Container>
    </EmptyDialog>
  )
}

export default CreateApp
