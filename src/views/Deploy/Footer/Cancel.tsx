import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@src/controller/reducer'
import { socketPushMsgForProject } from '@src/views/ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { APP_SELECT_DEPLOY_TYPE } from '@src/router'
import { SecondaryBtn } from '@src/components/Btn'

const Cancel: React.FC = () => {
  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const handleClick = () => {
    socketPushMsgForProject(
      activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE,
    }
    )
    navigate(
      {
        pathname: APP_SELECT_DEPLOY_TYPE,
      }
    )
  }

  return (
    <SecondaryBtn onClick={handleClick}>取消</SecondaryBtn>
  )
}

export default Cancel
