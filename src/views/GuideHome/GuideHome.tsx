import { Button } from 'antd'
import { addTask } from '@reducer/tasksSilce'
import { useDispatch } from 'react-redux'
import { useDebounceFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX } from '@router'
import { ReactComponent as Bushu } from './icon/bushu.svg'
import { ReactComponent as Shangchaun } from './icon/shangchaun.svg'
import { ReactComponent as Youhua } from './icon/youhua.svg'

import { ReactComponent as CAMB } from './icon/CAMB.svg'
import { ReactComponent as Yingwenda } from './icon/yingwenda.svg'
import { ReactComponent as HISI } from './icon/HISI.svg'
import { ReactComponent as MEDI } from './icon/MEDI.svg'
import { ReactComponent as SOPH } from './icon/SOPH.svg'
import { ReactComponent as Rock } from './icon/Rock.svg'
import { ReactComponent as QUAL } from './icon/QUAL.svg'
import { ReactComponent as SIGM } from './icon/SIGM.svg'

import './GuideHome.module.less'

// 这里的开始就是添加一个任务
const GuideHome = (): JSX.Element => {
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
    <div styleName='GuideHome'>
      <div className='title'>共达地智能系统</div>
      <div className='sub_title'>从开发到部署只需简单三步</div>
      <Button onClick={handleAddTask.run} className='start_gddi' type='primary'>开始</Button>
      <div className='train_process'>
        <Shangchaun />
        <Youhua />
        <Bushu />
      </div>
      <div className='manefature_list_title'>我们支持多种类型芯片,完美定制高精度AI模型</div>
      <div className='manefature_list'>
        <CAMB />
        <Yingwenda />
        <HISI />
        <MEDI />
        <QUAL />
        <Rock />
        <SIGM />
        <SOPH />
      </div>
    </div>
  )
}

export default GuideHome
