import { Box, IconButton, Skeleton, TextField, Tooltip, Typography } from '@mui/material'
import {useAtom} from 'jotai'
import React from 'react'

import EditIcon from '@mui/icons-material/Edit';
import Btn, { LoadingBtn } from '@src/components/Btn'
import { currentUserAtom } from '@src/store/user'
import userAPI from '@src/apis/user';
import { message } from 'antd';

const useMail = () => {
  const [userInfo, refreshUserInfo] = useAtom(currentUserAtom)
  const { email } = userInfo || { email: '' }
  const [editing, setEditing] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [editingEmail, setEditingEmail] = React.useState(email)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancel = () => {
    loading || setEditing(false)
    setEditingEmail(email)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditingEmail(e.target.value?.trim() || '')
  }

  const handleSave = async () => {
    if (loading) return

    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(editingEmail)) {
      message.warn('邮箱格式不正确')
      return
    }

    setLoading(true)
    const { success } = await userAPI.update({ email: editingEmail })
    setLoading(false)
    refreshUserInfo()
    if (!success) return
    setEditing(false)
    message.success('修改成功')
  }

  React.useEffect(
    () => {
      setEditingEmail(email)
    },
    [email]
  )

  return {
    email: email || '--',
    editingEmail,
    editing,
    loading,
    handleEdit,
    handleChange,
    handleCancel,
    handleSave
  }
}

const Mail: React.FC = () => {
  const {
    email,
    editing,
    editingEmail,
    loading,
    handleEdit,
    handleChange,
    handleCancel,
    handleSave
  } = useMail()


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
      }}
    >
      {
        editing ? (
          <>
            <TextField
              variant='standard'
              size='small'
              autoFocus
              autoComplete='email'
              value={editingEmail}
              onChange={handleChange}
            />
            <Btn color='black' variant='outlined' size='small' disabled={loading} onClick={handleCancel}>
              取消
            </Btn>
            <LoadingBtn color='black' variant='contained' size='small' loading={loading} onClick={handleSave}>
              保存
            </LoadingBtn>
          </>
        ) : (
          <>
            <Typography
              variant='body1' component='span' noWrap
              sx={{
                fontSize: '14px',
                fontWeight: 400,
              }}
            >
              {email}
            </Typography>
            <Tooltip title='修改邮箱'>
              <IconButton size='small' onClick={handleEdit}>
                <EditIcon fontSize='small' color='primary' />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    </Box>
  )
}

const Fallback: React.FC = () => {
  return (
    <Skeleton width={200} height={30} />
  )
}

const Nickname: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '20px',
        height: 30,
      }}
    >
      <Typography
        variant='body1' component='span' noWrap
        sx={{
          width: 45,
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '.6em',
        }}
      >
        邮箱
      </Typography>
      <React.Suspense fallback={<Fallback />}>
        <Mail />
      </React.Suspense>
    </Box>
  )
}

export default Nickname

