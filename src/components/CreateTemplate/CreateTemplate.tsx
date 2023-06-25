import { Button, Dialog } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import AddIcon from '@mui/icons-material/Add'
import styled from 'styled-components'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import DialogTransition from '../DialogTransition'
import { baseFormAtom, baseFormValueAtom, currentStepAtom, openAtom, pipelineAtom } from './store'
import Footer from './Footer'
import BaseForm from './BaseForm'
import Config from './Config'

const Container = styled.div`
  height: 100%;
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
  padding: 10px 40px;
  overflow: hidden;
`

export interface CreateTemplateProps {
  onOpen?(): void,
  onClose?(): void,
  onCreated?(): void,
}

const useCreateTemplate = ({
  onOpen,
  onClose,
}: CreateTemplateProps) => {
  const [step, setStep] = useAtom(currentStepAtom)
  const [open, setOpen] = useAtom(openAtom)
  const form = useAtomValue(baseFormAtom)
  const setFormValue = useSetAtom(baseFormValueAtom)
  const setPipeline = useSetAtom(pipelineAtom)

  const handleOpen = () => {
    setOpen(true)
    onOpen && onOpen()
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setStep('base')
      onClose && onClose()
      form?.resetFields()
      setFormValue(null)
      setPipeline(undefined)
    }, 200)
  }

  return {
    open,
    step,
    handleOpen,
    handleClose,
  }
}

const CreateTemplate: React.FC<CreateTemplateProps> = (props) => {
  const {
    open,
    step,
    handleOpen,
    handleClose,
  } = useCreateTemplate(props)

  return (
    <>
      <Button onClick={handleOpen}>
        <AddIcon />
        创建新模板
      </Button>
      <Dialog
        open={open} onClose={handleClose}
        TransitionComponent={DialogTransition}
        fullScreen
        sx={{
          zIndex: 1009,
        }}
        PaperProps={{
          sx: {
            background: theme => theme.palette.blue.main,
          }
        }}
      >
        <Container>
          <Header>
            {
              step === 'base' ? '创建模板' : '参数配置'
            }
          </Header>
          <Content>
            <Scrollbars autoHide>
              {
                step === 'base'
                  ? <BaseForm />
                  : null
              }
              {
                step === 'config'
                  ? <Config />
                  : null
              }
            </Scrollbars>
          </Content>
          <Footer
            onCancel={handleClose}
            onCreate={props.onCreated}
          />
        </Container>
      </Dialog>
    </>
  )
}

export default CreateTemplate
