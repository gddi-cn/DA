
import { ReactComponent as Arrow } from './icon/arrow.svg'
import { ReactComponent as Shujuleixing } from './icon/应用模版-active.svg'
import { ReactComponent as Jichuxingxin } from './icon/设置-default.svg'
import { ReactComponent as Shangchuan } from './icon/设备-default.svg'

import './StepHeaderOfThis.module.less'

type StepItem = {
    label: string,
    icon: React.ReactNode,
    id: number
}

const local_tab_list: StepItem[] = [
  {
    label: '选择应用模版',
    icon: <Shujuleixing />,
    id: 1
  },

  {
    label: '配置应用参数',
    icon: <Jichuxingxin />,
    id: 2
  },

  {
    label: '选择设备',
    icon: <Shangchuan />,
    id: 3
  },
]

// type Props = {

//     activeKey: number
// }
const activeKey = 1
const StepHeaderOfThis = (): JSX.Element => {
//   const { activeKey = 1 } = props

  const data: StepItem[] = local_tab_list

  const StepItem = (step_data: StepItem) => {
    const { id, label, icon } = step_data
    const getcls = () => {
      if (activeKey >= id) {
        return 'active_style'
      }
    }
    return (
      <div className={`StepItem ${getcls()}`}>
        {
          icon
        }
        <p className='label'>{label}</p>
      </div>
    )
  }

  const StepItemAndArrow = (step_data: StepItem) => {
    const { id, label, icon } = step_data
    const getcls = () => {
      if (activeKey >= id) {
        return 'active_style'
      }
    }
    const getsvgcls = () => {
      if ((+activeKey) - 1 >= (+id)) {
        return 'arrow active_svg_style'
      }

      return 'arrow'
    }
    return (
      <>
        <div className={`StepItem ${getcls()}`}>
          {
            icon
          }
          <p>{label}</p>
        </div>
        <Arrow className={getsvgcls()} />
      </>

    )
  }

  const Item = (props: { data: any, index: number, len: number }) => {
    const { data, index, len } = props
    if (index === len - 1) {
      return (
        StepItem(data)
      )
    }
    return (

      StepItemAndArrow(data)

    )
  }
  return (
    <div styleName='StepHeaderOfThis'>
      {
        data.map((o, i) => {
          return (
            <Item data={o} index={i} key={i} len={data.length} />
          )
        })
      }
    </div>
  )
}

export default StepHeaderOfThis
