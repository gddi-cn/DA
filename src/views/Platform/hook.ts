import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { APP_SELECT_DEPLOY_TYPE } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

export const useFooter = () => {
  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const handlePre = () => {
    navigate({
      pathname: APP_SELECT_DEPLOY_TYPE,
    })
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE
      }
    )
  }

  return {
    handlePre,
  }
}
