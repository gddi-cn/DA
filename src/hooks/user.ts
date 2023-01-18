import userAPI from '@src/apis/user'
import { authUserInfoAtom, fetchingUserInfo } from '@src/store/user'
import { useAtom } from 'jotai'

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
