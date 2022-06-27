
import './TaskItemPopover.module.less'

// 貌似里边需要很多细节额、如果是进行中的话、似乎需要更新很多信息
const TaskItemPopover = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='TaskItemPopover'>
      <div className='top_wrap'>
        <div className='task_name'>123</div>
        <div className='task_create_time'>123</div>
      </div>

      <div className='middle_wrap'>
        <div className='task_name'>123</div>
        <div className='task_create_time'>123</div>
      </div>

      <div className='bottom_wrap'>
        <div className='chip_type'>123</div>
      </div>
    </div>
  )
}

export default TaskItemPopover
