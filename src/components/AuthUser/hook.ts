import { useAtom } from 'jotai'
import { authUserInfoAtom } from '@src/store/user'
import { useNavigate } from 'react-router-dom'
import { APP_LOGIN, SPACE } from '@router'

export const useAuthUser = () => {
  const [authUser] = useAtom(authUserInfoAtom)
  const navigate = useNavigate()

  const { avatar, nick_name, mobile: _m } = authUser || {}

  const mobile = _m || '请至账户中心填写联系方式'

  const toSpace = () => {
    navigate({ pathname: SPACE })
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate({
      pathname: APP_LOGIN
    })
  }

  return {
    avatar,
    username: nick_name || '-',
    mobile,
    toSpace,
    logout,
  }
}
