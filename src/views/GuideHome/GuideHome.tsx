import { Button } from 'antd'
import { addTask } from '@reducer/tasksSilce'
import { useDispatch } from 'react-redux'
import { useDebounceFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_DETAIL } from '@router'
import './GuideHome.module.less'

// 这里的开始就是添加一个任务
const GuideHome = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleAddTask = useDebounceFn(() => {
    // 创建好像不需要什么信息
    dispatch(addTask(null))

    navigate({
      pathname: APP_DATASET_DETAIL
    })
  }, {
    wait: 0
  })
  return (
    <div styleName='GuideHome'>
      <Button onClick={handleAddTask.run}>开始</Button>
    </div>
  )
}

export default GuideHome
