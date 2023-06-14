import React from 'react'
import * as Yup from 'yup'
import {
  Box, Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField,
} from '@mui/material'
import DialogTransition from '@src/components/DialogTransition'
import { SecondaryBtn, PrimaryLoadingBtn } from '@src/components/Btn'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik'
import userAPI from '@src/apis/user'
import { useLogout } from '@src/hooks/user'
import { message } from 'antd'

const FORM_ID = 'update-pwd-form'

const useUpdatePwd = () => {
  const [open, setOpen] = React.useState(false)
  const [updating, setUpdating] = React.useState(false)
  const [showOldPwd, setShowOldPwd] = React.useState(false)
  const [showNewPwd, setShowNewPwd] = React.useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = React.useState(false)
  const [validateOnChange, setValidateOnChange] = React.useState(false)

  const oldPwdInputRef = React.useRef<HTMLInputElement>(null)
  const handleLogout = useLogout()

  const formik = useFormik<User.ChangePassword.Form>({
    initialValues: {
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
    },
    validationSchema: Yup.object({
      oldPwd: Yup
        .string()
        .required('请输入旧密码')
        .min(8, '密码最短为 8 位字符')
        .max(20, '密码最长为 20 位字符'),
      newPwd: Yup
        .string()
        .required('请输入新密码')
        .min(8, '密码最短为 8 位字符')
        .max(20, '密码最长为 20 位字符'),
      confirmPwd: Yup
        .string()
        .required('请确认密码')
        .when('newPwd', {
          is: (value: string) => value && value.length > 0,
          then: (schema) => schema.oneOf(
            [Yup.ref('newPwd')],
            '两次输入的密码不一致'
          )
        }),
    }),
    onSubmit: async ({ newPwd: new_password, oldPwd: old_password }) => {
      setUpdating(true)
      const { success } = await userAPI.changePassword({ new_password, old_password })
      setUpdating(false)

      if (!success) return

      message.success('修改成功')

      setOpen(false)
      handleLogout()
    },
    validateOnChange,
  })

  const handleOpen = () => {
    setOpen(true)
    setTimeout(() => oldPwdInputRef.current?.focus())
  }

  const handleClose = () => {
    updating || setOpen(false)
  }

  const toggleShowOldPwd = () => {
    setShowOldPwd(s => !s)
  }

  const toggleShowNewPwd = () => {
    setShowNewPwd(s => !s)
  }

  const toggleShowConfirm = () => {
    setShowConfirmPwd(s => !s)
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
    updating,
    oldPwdInputRef,
    formik,
    showOldPwd,
    showNewPwd,
    showConfirmPwd,
    handleOpen,
    handleClose,
    toggleShowOldPwd,
    toggleShowNewPwd,
    toggleShowConfirm,
    handleSubmitClick,
  }
}

const UpdatePwd: React.FC = () => {
  const {
    open,
    updating,
    oldPwdInputRef,
    formik,
    showOldPwd,
    showNewPwd,
    showConfirmPwd,
    handleOpen,
    handleClose,
    toggleShowOldPwd,
    toggleShowNewPwd,
    toggleShowConfirm,
    handleSubmitClick,
  } = useUpdatePwd()

  return (
    <>
      <Button
        color='primary' variant='text' sx={{ alignSelf: 'start', p: 0, minWidth: 0 }}
        onClick={handleOpen}
      >
        修改密码
      </Button>
      <Dialog
        open={open} onClose={handleClose}
        TransitionComponent={DialogTransition}
        fullWidth maxWidth='md'
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
          修改密码
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
              label='旧密码'
              name='oldPwd'
              value={formik.values.oldPwd}
              error={!!formik.errors.oldPwd}
              helperText={formik.errors.oldPwd || ' '}
              onChange={e => {
                formik.setFieldValue(
                  "oldPwd",
                  e.target.value.replace(/\s+/g, "")
                )
              }}
              type={showOldPwd ? 'text' : 'password'}
              inputRef={oldPwdInputRef}
              margin='normal'
              variant='outlined'
              size='small'
              required
              autoComplete='off'
              InputProps={{
                sx: {
                  width: 436,
                  backgroundColor: '#fff',
                },
                endAdornment: (
                  <IconButton
                    tabIndex={-1} size={'small'}
                    onClick={toggleShowOldPwd}
                    sx={{ zIndex: 2 }}
                  >
                    {
                      showOldPwd ? (
                        <VisibilityOff fontSize={'small'} />
                      ) : (
                        <Visibility fontSize={'small'} />
                      )
                    }
                  </IconButton>
                )
              }}
            />
            <TextField
              label='新密码'
              name='newPwd'
              value={formik.values.newPwd}
              error={!!formik.errors.newPwd}
              helperText={formik.errors.newPwd || ' '}
              onChange={e => {
                formik.setFieldValue(
                  "newPwd",
                  e.target.value.replace(/\s+/g, "")
                )
              }}
              type={showNewPwd ? 'text' : 'password'}
              margin='normal'
              variant='outlined'
              size='small'
              required
              autoComplete='off'
              InputProps={{
                sx: {
                  width: 436,
                  backgroundColor: '#fff',
                },
                endAdornment: (
                  <IconButton
                    tabIndex={-1} size={'small'}
                    onClick={toggleShowNewPwd}
                    sx={{ zIndex: 2 }}
                  >
                    {
                      showNewPwd ? (
                        <VisibilityOff fontSize={'small'} />
                      ) : (
                        <Visibility fontSize={'small'} />
                      )
                    }
                  </IconButton>
                )
              }}
            />
            <TextField
              label='确认密码'
              name='confirmPwd'
              value={formik.values.confirmPwd}
              error={!!formik.errors.confirmPwd}
              helperText={formik.errors.confirmPwd || ' '}
              onChange={e => {
                formik.setFieldValue(
                  "confirmPwd",
                  e.target.value.replace(/\s+/g, "")
                )
              }}
              type={showConfirmPwd ? 'text' : 'password'}
              margin='normal'
              variant='outlined'
              size='small'
              required
              autoComplete='off'
              InputProps={{
                sx: {
                  width: 436,
                  backgroundColor: '#fff',
                },
                endAdornment: (
                  <IconButton
                    tabIndex={-1} size={'small'}
                    onClick={toggleShowConfirm}
                    sx={{ zIndex: 2 }}
                  >
                    {
                      showConfirmPwd ? (
                        <VisibilityOff fontSize={'small'} />
                      ) : (
                        <Visibility fontSize={'small'} />
                      )
                    }
                  </IconButton>
                )
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0, columnGap: 3 }} disableSpacing>
          <SecondaryBtn
            onClick={handleClose} disabled={updating}
          >
            取消
          </SecondaryBtn>
          <PrimaryLoadingBtn
            loading={updating}
            type='submit' form={FORM_ID}
            onClick={handleSubmitClick}
          >
            修改
          </PrimaryLoadingBtn>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdatePwd

