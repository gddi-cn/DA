import React from 'react'
import { Box, Skeleton, Tooltip, styled } from '@mui/material'
import { useAtom } from 'jotai'

import { currentUserAtom } from '@src/store/user'
import defaultAvatar from '@src/asset/defaultAvatar.png'
import { ReactComponent as CameraIcon } from '@src/asset/camera.svg'
import s3API from '@src/apis/s3New'
import userAPI from '@src/apis/user'
import { message } from 'antd'

const Wrap = styled(Box)(() => ({
  width: 100,
  height: 100,
  borderRadius: 8,
  position: 'relative',
  backgroundColor: '#fff',
  cursor: 'pointer',
}))

const Avatar = styled('img')(() => ({
  width: '100%',
  height: '100%',
  display: "block",
  objectFit: "cover",
  backagroundColor: '#aaeeaa'
}))



const useUserAvatar = () => {
  const [loading, setLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [userInfo , refreshUserInfo] = useAtom(currentUserAtom)

  const avatar = userInfo?.avatar || defaultAvatar

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (loading) {
      e.target.value = ''
      return
    }

    const file = e.target.files?.[0]
    e.target.value = ''

    if (!file) return

    if (!/.(jpg|jpeg|png)$/.test(file.name)) {
      message.warn('不支持的文件类型')
      return
    }

    setLoading(true)
    const { success, data } = await s3API.uploadFile(file)
    if (success && data) {
      const { success: _ } = await userAPI.update({ avatar: data })
      message.success('更新头像成功')
    }
    setLoading(false)
    refreshUserInfo()
  }

  return {
    inputRef,
    avatar,
    handleClick,
    handleChange,
  }
}

const Inner: React.FC = () => {
  const {
    inputRef,
    avatar,
    handleClick,
    handleChange,
  } = useUserAvatar()

  return (
    <Tooltip title='更换头像'>
      <Wrap onClick={handleClick}>
        <Avatar alt='avatar' src={avatar} />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '25px',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'rgba(98, 176, 229, .3)',
          }}
        >
          <Box height={22} width={22}>
            <CameraIcon />
          </Box>
        </Box>
        <input
          ref={inputRef}
          type='file'
          style={{ display: 'none' }}
          onChange={handleChange}
          accept={'image/png, image/jpeg, image/jpg'}
        />
      </Wrap>
    </Tooltip>
  )
}

const Fallback: React.FC = () => {
  return (
    <Skeleton width={100} height={100} sx={{ borderRadius: '8px' }} />
  )
}

const UserAvatar: React.FC = () => {
  return (
    <React.Suspense fallback={<Fallback />}>
      <Inner />
    </React.Suspense>
  )
}

export default UserAvatar

