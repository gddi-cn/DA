import { Outlet, useNavigate } from 'react-router-dom';
import TaskAndUserInfoHeader from './TaskAndUserInfoHeader'
import { useSocketSyncUpdate } from '@src/views/ghooks'
import { Spin } from 'antd';
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { useMemo, useEffect } from 'react';
import { isEmpty } from 'lodash'
import { APP_GUIDE_PAGE } from '@router'

import './AutoMLLayout.module.less'

const AutoMLLayout = (): JSX.Element => {
  // const location = useLocation()
  const navigate = useNavigate()
  // console.log(location.pathname, 'location.pathname')
  const activePipeLineLoading = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLineLoading
  })

  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })

  useEffect(() => {
    if (isEmpty(taskList)) {
      // dispatch(saveActivePipeLine({ active_page: SNAPSHOT_KEY_OF_ROUTER.APP_GUIDE_PAGE }))
      navigate({
        pathname: APP_GUIDE_PAGE
      })
    }
  }, [navigate, taskList])

  useSocketSyncUpdate()

  return (
    <div styleName='AutoMLLayout'>
      <TaskAndUserInfoHeader />
      <Outlet />
    </div>
  )
}

export default AutoMLLayout
