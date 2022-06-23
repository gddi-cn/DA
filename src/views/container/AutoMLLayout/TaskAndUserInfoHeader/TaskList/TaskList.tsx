import TaskItem from './common/TaskItem'
import './TaskList.module.less'

const TaskList = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='TaskList'>
      {
        Array.from({ length: 8 }).fill('ontainer_AutoMLLayout_index_ts.199d50ecc55288558645.hot-update.js').map((o, i) => {
          return (
            <TaskItem key={i} data={o}/>
          )
        })
      }
    </div>
  )
}

export default TaskList
