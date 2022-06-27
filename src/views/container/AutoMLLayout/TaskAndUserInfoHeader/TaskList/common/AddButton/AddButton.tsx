import { PlusOutlined } from '@ant-design/icons'
import { addTask } from '@reducer/tasksSilce'
import { useDispatch } from 'react-redux'
import { useDebounceFn } from 'ahooks'
import './AddButton.module.less'

const AddButton = (): JSX.Element => {
  const dispatch = useDispatch()
  const handleAddTask = useDebounceFn(() => {
    // 创建好像不需要什么信息

    dispatch(addTask(null))
  }, {
    wait: 0
  })
  return (
    <div styleName='AddButton'>
      <div className='plus_icon_wrap' onClick={handleAddTask.run}>
        <PlusOutlined />
      </div>
    </div>
  )
}

export default AddButton
