import StepHeaderOfThis from '../StepHeaderOfThis'
import { FooterBar, GButton } from '@src/UIComponents'
import { useEffect, useMemo, useState } from 'react'
import { APP_ForecastModule, APP_SelectModule } from '@router'
import { useNavigate } from 'react-router-dom'
import api from '@api'
import GddiFlow from './GddiFlow'
import { isEmpty } from 'lodash'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './SetModuleConfig.module.less'

// const app_id = 288

const SetModuleConfig = (props: any): JSX.Element => {
  console.log(props)
  const navigate = useNavigate()
  const [appBaseInfo, setAppBaseInfo] = useState<any>({})
  const [flowValue, setFlowValue] = useState<any>({

  })

  const app_id = useSelector((state: RootState) => {
    const { activePipeLine } = state.tasksSilce
    if (activePipeLine) {
      if (activePipeLine?.APP_SetModuleConfig?.id) {
        return activePipeLine?.APP_SetModuleConfig?.id
      }
    }
    return undefined
  })

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  useEffect(() => {
    const fetchBaseInfo = async () => {
      try {
        if (!app_id) {
          return
        }
        const res = await api.get(`/v3/apps/${app_id}`)
        if (res?.code === 0) {
          const { data: baseInfo } = res

          const { config_url } = baseInfo
          const res_of_config_url = await api.get(config_url)
          const versionRes = await api.get(`/v3/moduleDefinitions/${res_of_config_url?.version}`, {
            headers: {
              'Cache-Control': 'no-cache'
            }
          })
          const moduleDefinitions = await api.get(versionRes.data.url)
          setAppBaseInfo(baseInfo)
          setFlowValue({
            defaultValue: res_of_config_url,
            moduleDefinitions
          })
        }
      } catch (e) {

      }
    }
    fetchBaseInfo()
  }, [app_id])

  const views = useMemo(() => {
    if (isEmpty(flowValue)) {
      return null
    }
    return (
      <div className='draft_wrap'>
        <GddiFlow flowValue={flowValue} appBaseInfo={appBaseInfo}/>
      </div>
    )
  }, [flowValue, appBaseInfo])
  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_SelectModule
      })

      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SelectModule
        }
      )
    }

    const goNext = async () => {
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next

      navigate({
        pathname: APP_ForecastModule
      })

      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_ForecastModule
        }
      )
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [activePipeLine, navigate])
  return (
    <div styleName='SetModuleConfig'>
      <div className='SetModuleConfig_wrap'>
        <StepHeaderOfThis />
        <div className='gddi_flow_wrap'>
          <div className='gddi_flow_content'>
            {
              views
            }
          </div>
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SetModuleConfig
