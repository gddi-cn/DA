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

  const activeTaskId = useSelector((state: RootState) => state.tasksSilce.activeTaskInfo?.id)

  useEffect(() => {
    if (isEmpty(taskList)) {
      // dispatch(saveActivePipeLine({ active_page: SNAPSHOT_KEY_OF_ROUTER.APP_GUIDE_PAGE }))
      navigate({
        pathname: APP_GUIDE_PAGE
      })
    }
  }, [navigate, taskList])

  useSocketSyncUpdate()

  const getView = useMemo(
    () => {
      // PPT是不需要性能的
      if (activePipeLineLoading) {
        return (
          <div className='transition_div'>
            <Spin tip='页面加载中' />
          </div>
        )
      } else {
        return (
          <Outlet />
        )
      }
    }, [activePipeLineLoading]
  )

  // if (taskList.length === 0) {
  //   return <Navigate to={APP_GUIDE_PAGE}/>
  // }
  return (
    <div styleName='AutoMLLayout'>
      {useMemo(() => <TaskAndUserInfoHeader />, [])}
      {getView}
    </div>
  )
}

export default AutoMLLayout
