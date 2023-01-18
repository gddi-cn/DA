import React from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { Form, message } from 'antd'

import userAPI from '@src/apis/user'
import s3API from '@src/apis/s3'
import { authUserInfoAtom } from '@src/store/user'
import { useRefreshAuthUserInfo } from '@src/hooks/user'
import { APP_LOGIN } from '@router'

export const useAvatar = () => {
  const [userInfo] = useAtom(authUserInfoAtom)
  const [loading, setLoading] = React.useState<boolean>(false)

  const { avatar } = userInfo || {}

  const refreshUserInfo = useRefreshAuthUserInfo()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (loading) {
      e.target.value = ''
      return
    }

    const file = e.target.files && e.target.files[0]

    e.target.value = ''

    if (!file) return

    const { name } = file

    if (!/.(jpg|jpeg|png)$/.test(name.toLowerCase())) {
      message.warn('不支持该类型文件')
      return
    }

    setLoading(true)
    const { success, data } = await s3API.uploadRawFile(file)

    if (success && data) {
      const { success } = await userAPI.update({ avatar: data })
      success && message.success('修改成功')
    }
    setLoading(false)
    refreshUserInfo()
  }

  return {
    avatar,
    handleChange,
  }
}

export const useUserName = () => {
  const [userInfo] = useAtom(authUserInfoAtom)
  const [editing, setEditing] = React.useState<boolean>(false)

  const { nick_name } = userInfo || { nick_name: '' }

  const [inputValue, setInputValue] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const refreshUserInfo = useRefreshAuthUserInfo()

  const handleEdit = () => {
    setInputValue(nick_name)
    setEditing(true)
  }

  const handleCancel = () => {
    setInputValue(nick_name)
    setEditing(false)
  }

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value || '')
  }

  const handleUpdate = async () => {
    if (loading) return

    setLoading(true)
    const { success } = await userAPI.update({ nick_name: inputValue })
    setLoading(false)

    refreshUserInfo()

    if (success) {
      message.success('修改成功')
      handleCancel()
    }
  }

  return {
    nickName: nick_name,
    editing,
    handleEdit,
    inputValue,
    handleNameChange,
    handleCancel,
    handleUpdate,
    loading,
  }
}

export const useEmail = () => {
  const [userInfo] = useAtom(authUserInfoAtom)
  const [editing, setEditing] = React.useState<boolean>(false)

  const { email } = userInfo || { email: '' }

  const [inputValue, setInputValue] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const refreshUserInfo = useRefreshAuthUserInfo()

  const handleEdit = () => {
    setInputValue(email)
    setEditing(true)
  }

  const handleCancel = () => {
    setInputValue(email)
    setEditing(false)
  }

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value || '')
  }

  const handleUpdate = async () => {
    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(inputValue)) {
      message.warn('请输入正确的邮箱')
      return
    }

    if (loading) return

    setLoading(true)
    const { success } = await userAPI.update({ email: inputValue })
    setLoading(false)

    refreshUserInfo()

    if (success) {
      message.success('修改成功')
      handleCancel()
    }
  }

  return {
    email,
    editing,
    handleEdit,
    inputValue,
    handleNameChange,
    handleCancel,
    handleUpdate,
    loading,
  }
}

export const usePassword = () => {
  const [form] = Form.useForm<User.ChangePwdForm>()
  const [open ,setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    if (loading) return
    setOpen(false)
  }

  const handleUpdate = async () => {
    if (loading) return

    const { np, op } = await form.validateFields()

    setLoading(true)
    const { success } = await userAPI.updatePwd({ old_password: op, new_password: np })
    setLoading(false)

    if (!success) return

    message.success('修改成功，请重新登录')

    localStorage.removeItem('token')

    navigate({
      pathname: APP_LOGIN
    })
  }

  return {
    open,
    handleOpen,
    handleClose,
    form,
    loading,
    handleUpdate,
  }
}