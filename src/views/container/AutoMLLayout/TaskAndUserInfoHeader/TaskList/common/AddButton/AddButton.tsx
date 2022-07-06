import { PlusOutlined } from '@ant-design/icons'
import { addTask } from '@reducer/tasksSilce'
import { useDispatch } from 'react-redux'
import { useDebounceFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX } from '@router'
import './AddButton.module.less'

const AddButton = (): JSX.Element => {
  console.log('1111')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleAddTask = useDebounceFn(() => {
    // 创建好像不需要什么信息

    dispatch(addTask(null))

    navigate({
      pathname: APP_DATA_SET_INDEX
    })
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