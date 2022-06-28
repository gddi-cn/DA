import { EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './TaskNameBar.module.less'

const TaskNameBar = (): JSX.Element => {
  const model = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.model
  })
  return (
    <div styleName='TaskNameBar'>
      <EditOutlined />   {model?.taskName || '未命名'}
    </div>
  )
}

export default TaskNameBar
