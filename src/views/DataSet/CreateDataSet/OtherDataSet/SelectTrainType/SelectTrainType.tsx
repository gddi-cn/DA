import { FooterBar, GButton } from '@src/UIComponents'
import { useMemo, useState, useEffect } from 'react'
import { ReactComponent as Mubiaojiance } from './icon/mubiaojiance.svg'
import { ReactComponent as Tupianfenlei } from './icon/tupianfenlei.svg'
import { ReactComponent as Tongyongfenge } from './icon/tongyongfenge.svg'
import { ReactComponent as Xiaoxiangfenge } from './icon/xiaoxiangfenge.svg'
import { ReactComponent as Zitaijiance } from './icon/zitaijiance.svg'
import { ReactComponent as Danmu3d } from './icon/danmu3d.svg'
import { isEmpty } from 'lodash'
import { THIRD_PARTY_MODEL_TYPES, SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_CREATE_TYPE, APP_THIRDPARTY_STEP_1 } from '@router'
import { message } from 'antd'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './SelectTrainType.module.less'

const MODEL_TYPES_ICON: any = {
  detection: <Mubiaojiance />,
  classify: <Tupianfenlei />,
  // face_detection: '人脸检测',
  // face_recognition: '人脸识别',
  cityscapes_segment: <Tongyongfenge />,
  portrait_segment: <Xiaoxiangfenge />,
  pose_detection: <Zitaijiance />,
  monocular_3d_detection: <Danmu3d />
}

type arrItem = {
    icon: React.ReactNode,
    sences: string,
    value: string
}
const arr: arrItem[] = []

for (const [k, v] of Object.entries(THIRD_PARTY_MODEL_TYPES)) {
  arr.push({
    icon: MODEL_TYPES_ICON[k],
    sences: v,
    value: k
  })
}

const SelectTrainType = (): JSX.Element => {
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const navigate = useNavigate()

  const [activeType, setActiveType] = useState('')

  useEffect(() => {
    if (activePipeLine.APP_THIRDPARTY_SelectTrainType) {
      const { activeType } = activePipeLine.APP_THIRDPARTY_SelectTrainType
      setActiveType(activeType)
    }
  }, [activePipeLine])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_DATASET_CREATE_TYPE
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_CREATE_TYPE
      })
    }

    const goNext = () => {
      if (isEmpty(activeType)) {
        message.warning('请选择数据类型')
      }
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next
      navigate({
        pathname: APP_THIRDPARTY_STEP_1
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_STEP_1,
      })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton className={isEmpty(activeType) ? 'not_allow' : 'yes_sir'} style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [activeType, navigate, activePipeLine])

  const handleClick = (data: arrItem) => {
    setActiveType(data.value)

    socketPushMsgForProject(activePipeLine, {

      APP_THIRDPARTY_SelectTrainType: { activeType: data.value }
    })
  }

  const getCls = (o: arrItem) => {
    const { value } = o
    if (activeType === value) {
      return 'SelectTrainType_list_item btn-16 SelectTrainType_list_item_active'
    }
    return 'SelectTrainType_list_item btn-16'
  }

  return (
    <div styleName='SelectTrainType'>
      <div className='SelectTrainType_list_wrap'>
        <div className='SelectTrainType_list'>
          {
            arr.map((o, i) => {
              return (
                <div key={i} onClick={() => handleClick(o)} className={getCls(o)}>
                  {o.icon}
                </div>
              )
            })
          }
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SelectTrainType
