import userAPI from '@src/apis/user'
import { APP_LOGIN } from '@src/router'
import {authUserInfoAtom, currentUserAtom, fetchingUserInfo} from '@src/store/user'
import {useAtom, useAtomValue} from 'jotai'
import { useNavigate } from 'react-router-dom'
import {DatasetScene} from "@src/shared/enum/dataset";

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

export const useShowCowFace = () => {
  const user = useAtomValue(currentUserAtom)

  return user?.custom_infos?.extraScenes?.includes(
    DatasetScene.CowFaceRecognition,
  );
};
