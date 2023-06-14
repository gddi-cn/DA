import userAPI from '@src/apis/user'
import { APP_LOGIN } from '@src/router'
import { authUserInfoAtom, fetchingUserInfo } from '@src/store/user'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'

export const useRefreshAuthUserInfo = () => {
  const [loading, setLoading] = useAtom(fetchingUserInfo)
  const [, setAuthUser] = useAtom(authUserInfoAtom)

  return async () => {
    if (loading) return

    setLoading(true)
    const { success, data } = await userAPI.info()
    setLoading(false)

    if (!success || !data) {
      setAuthUser(null)
      return
    }

    setAuthUser(data || null)
  }
}

export const useLogout = () => {
  const navigate = useNavigate()

  return () => {
    localStorage.removeItem('token')
    navigate({
      pathname: APP_LOGIN
    })
  }
}