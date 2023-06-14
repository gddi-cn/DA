import {
  PrimaryBtn,
  SecondaryBtn,
  PrimaryLoadingBtn,
} from '@src/components/Btn'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import DialogTransition from '@src/components/DialogTransition'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useSetAtom } from 'jotai'
import { refreshApiKeyAtom } from './store'
import apiKeyAPI from '@src/apis/apiKey'
import { message } from 'antd'

const DOCS_HREF = 'https://s3.sz.cdn.desauto.net/public/docs/Desauto_AI_Open_API_v2.pdf'

const FORM_ID = 'create-api-key-form'

const useCreateAPIKey = () => {
  const [open, setOpen] = React.useState(false)
  const [creating, setCreating] = React.useState(false)
  const [validateOnChange, setValidateOnChange] = React.useState(false)
  const nameInputRef = React.useRef<HTMLInputElement>(null)
  const refreshList = useSetAtom(refreshApiKeyAtom)

  const formik = useFormik<{ name: string }>({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('请输入凭证名称'),
    }),
    onSubmit: async ({ name }) => {
      if (creating) return
      setCreating(true)
      const { success } = await apiKeyAPI.create({ name })
      setCreating(false)
      refreshList()

      if (!success) return

      message.success('创建成功')
      setOpen(false)
    },
    validateOnChange,
  })

  const handleOpen = () => {
    setOpen(true)
    setTimeout(() => nameInputRef.current?.focus())
  }

  const handleClose = () => {
    creating || setOpen(false)
  }

  const handleSubmitClick = () => {
    setValidateOnChange(true)
  }

  React.useEffect(
    () => {
      open || formik.resetForm()
    },
    [open]
  )

  return {
    open,
    creating,
    nameInputRef,
    formik,
    handleOpen,
    handleClose,
    handleSubmitClick,
  }
}

const CreateAPIKey: React.FC = () => {
  const {
    open,
    creating,
    nameInputRef,
    formik,
    handleOpen,
    handleClose,
    handleSubmitClick,
  } = useCreateAPIKey()

  return (
    <>
      <PrimaryBtn onClick={handleOpen}>
        新增 API Key
      </PrimaryBtn>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={DialogTransition}
        fullWidth maxWidth='sm'
        PaperProps={{
          sx: {
            background: theme => theme.palette.blue.main,
            outline: theme => `2px solid ${theme.palette.primary.main}`,
            borderRadius: '12px',
            p: '40px 40px 16px',
          }
        }}
      >
        <DialogTitle
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            p: 0,
          }}
        >
          新增 API Key
        </DialogTitle>
        <DialogContent>
          <Box
            id={FORM_ID} component='form' noValidate
            onSubmit={formik.handleSubmit}
            sx={{
              py: '70px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '30px',
              '.MuiTextField-root': {
                '> label, > div': {
                  color: '#000',
                },
                '> label.Mui-focused': {
                  color: theme => theme.palette.primary.main,
                },
                '> label.Mui-required': {
                  '> span': {
                    color: theme => theme.palette.error.main,
                  }
                },
                '> label.Mui-error': {
                  color: theme => theme.palette.error.main
                }
              }
            }}
          >
            <TextField
              name='name'
              label='凭证名称'
              inputRef={nameInputRef}
              value={formik.values.name}
              error={!!formik.errors.name}
              helperText={formik.errors.name || ' '}
              onChange={e => {
                formik.setFieldValue(
                  "name",
                  e.target.value.replace(/\s+/g, "")
                )
              }}
              autoComplete='api_key_name'
              margin='normal'
              variant='outlined'
              size='small'
              required
              InputProps={{
                sx: {
                  width: 436,
                  backgroundColor: '#fff',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0, columnGap: 3 }} disableSpacing>
          <SecondaryBtn onClick={handleClose}>
            取消
          </SecondaryBtn>
          <PrimaryLoadingBtn
            loading={creating}
            type='submit' form={FORM_ID}
            onClick={handleSubmitClick}
          >
            添加
          </PrimaryLoadingBtn>
        </DialogActions>
      </Dialog>
    </>
  )
}


const Actions: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: 2,
      }}
    >
      <SecondaryBtn
        color='black'
        variant='outlined'
        size='small'
        href={DOCS_HREF}
        target='_blank'
        sx={{
          minWidth: 97,
          color: '#000',
          '&:hover': {
            color: "#000"
          }
        }}
      >
        查看文档
      </SecondaryBtn>
      <CreateAPIKey />
    </Box>
  )
}

export default Actions

