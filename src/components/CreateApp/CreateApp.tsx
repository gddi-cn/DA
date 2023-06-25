import React from 'react'
import styled from 'styled-components'

import { useCreateApp } from './hook'

import BaseForm from './BaseForm'
import SelecteTemplate from './SelectTemplate'
import Footer from './Footer'
import { Dialog } from '@mui/material'
import DialogTransition from '../DialogTransition'

const Container = styled.div`
  height: 90vh;
  min-height: 720px;
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

export interface CreateAppProps {
  open: boolean,
  onCancel: () => void
  onCreate: (app: App.Instance) => void
}

const CreateApp: React.FC<CreateAppProps> = (
  {
    open,
    onCancel,
    onCreate,
  }
) => {
  const {
    step,
    handleClose
  } = useCreateApp(onCancel)

  return (
    <Dialog
      open={open} onClose={handleClose}
      TransitionComponent={DialogTransition}
      fullWidth maxWidth={'ll'}
      sx={{
        zIndex: 999,
      }}
      PaperProps={{
        sx: {
          background: theme => theme.palette.blue.main,
          outline: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: '12px',
        }
      }}
    >
      <Container>
        <Header>
          {step === 'base' ? '应用信息' : '选择模板'}
        </Header>
        <Content>
          {step === 'base' ? <BaseForm /> : null}
          {step === 'template' ? <SelecteTemplate /> : null}
        </Content>
        <Footer onCreate={onCreate} onCancel={onCancel} />
      </Container>
    </Dialog>
  )
}

export default CreateApp

