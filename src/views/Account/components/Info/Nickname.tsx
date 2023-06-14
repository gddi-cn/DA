import { Box, IconButton, Skeleton, TextField, Tooltip, Typography } from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'

import EditIcon from '@mui/icons-material/Edit';
import Btn, { LoadingBtn } from '@src/components/Btn'
import { currentUserAtom, refreshUserAtom } from '@src/store/user'
import userAPI from '@src/apis/user';
import { message } from 'antd';

const useName = () => {
  const userInfo = useAtomValue(currentUserAtom)
  const refreshUserInfo = useSetAtom(refreshUserAtom)
  const { nick_name: nickname } = userInfo || { nick_name: '' }
  const [editing, setEditing] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [editingName, setEditingName] = React.useState(nickname)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancel = () => {
    loading || setEditing(false)
    setEditingName(nickname)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditingName(e.target.value?.trim() || '')
  }

  const handleSave = async () => {
    if (loading) return

    setLoading(true)
    const { success } = await userAPI.update({ nick_name: editingName })
    setLoading(false)
    refreshUserInfo()
    if (!success) return
    setEditing(false)
    message.success('修改成功')
  }

  React.useEffect(
    () => {
      setEditingName(nickname)
    },
    [nickname]
  )

  return {
    nickname: nickname || '--',
    editingName,
    editing,
    loading,
    handleEdit,
    handleChange,
    handleCancel,
    handleSave
  }
}

const Name: React.FC = () => {
  const {
    nickname,
    editing,
    editingName,
    loading,
    handleEdit,
    handleChange,
    handleCancel,
    handleSave
  } = useName()


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
              autoComplete='nickname'
              value={editingName}
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
              {nickname}
            </Typography>
            <Tooltip title='修改昵称'>
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
        昵称
      </Typography>
      <React.Suspense fallback={<Fallback />}>
        <Name />
      </React.Suspense>
    </Box>
  )
}

export default Nickname

