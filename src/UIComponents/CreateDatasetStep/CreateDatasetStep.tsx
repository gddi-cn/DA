
import { useMemo } from 'react'
import { ReactComponent as Arrow } from './icon/arrow.svg'
import { ReactComponent as Shujuleixing } from './icon/数据类型.svg'
import { ReactComponent as Jichuxingxin } from './icon/基础信息.svg'
import { ReactComponent as Shangchuan } from './icon/上传数据.svg'
import { ReactComponent as Xuanzepingtai } from './icon/选择平台.svg'
import { ReactComponent as Xuanxiangmu } from './icon/选择项目.svg'
import { ReactComponent as Queren } from './icon/确认.svg'
import './CreateDatasetStep.module.less'

type StepItem ={
    label:string,
    icon:React.ReactNode,
    id:number
}

const local_tab_list: StepItem[] = [
  {
    label: '选择数据类型',
    icon: <Shujuleixing />,
    id: 1
  },

  {
    label: '设置基础信息',
    icon: <Jichuxingxin />,
    id: 2
  },

  {
    label: '上传数据文件',
    icon: <Shangchuan />,
    id: 3
  },
]

const thirdparty_tab_list: StepItem[] = [
  {
    label: '选择第三方平台',
    icon: <Xuanzepingtai />,
    id: 1
  },

  {
    label: '选择项目',
    icon: <Xuanxiangmu />,
    id: 2
  },

  {
    label: '确认数据信息',
    icon: <Queren />,
    id: 3
  },
]
type Props = {
    type: 'local' |'thirdparty',
    activeKey:number
}

const CreateDatasetStep = (props: Props): JSX.Element => {
  const { type, activeKey } = props

  const data: StepItem[] = useMemo(() => {
    const obj = {
      local: local_tab_list,
      thirdparty: thirdparty_tab_list
    }

    return obj[type]
  }, [type])

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

  const Item = (props: { data: any, index: number, len :number}) => {
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
    <div styleName='CreateDatasetStep'>
      {
        data.map((o, i) => {
          return (
            <Item data={o} index={i} key={i} len={data.length}/>
          )
        })
      }
    </div>
  )
}

export default CreateDatasetStep
