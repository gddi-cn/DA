import { Button, Dialog } from '@mui/material'
import React from 'react'
import DialogTransition from '../DialogTransition'
import styled from 'styled-components'

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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 40px 20px;
`

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`

const useCreateTemplate = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen =() => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return {
    open,
    handleOpen,
    handleClose,
  }
}

const CreateTemplate: React.FC = () => {
  const {
    open,
    handleOpen,
    handleClose,
  } = useCreateTemplate()

  return (
    <>
      <Button size='small' onClick={handleOpen}>+ 创建新模板</Button>
      <Dialog
        open={open} onClose={handleClose}
        TransitionComponent={DialogTransition}
        fullWidth maxWidth={'ll'}
        sx={{
          zIndex: 1009,
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
          <Header>创建模板</Header>
          <Content>123</Content>
          <Footer>Footer</Footer>
        </Container>
      </Dialog>
    </>
  )
}

export default CreateTemplate
