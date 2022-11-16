import React from 'react'
import { Collapse } from 'antd';
import { ReactCusScrollBar, GButton, FooterBar } from '@src/UIComponents'
import SDKDocuments from '../SDKDocuments'
import ApplyAuth from '../ApplyAuth'
import DownloadLisense from '../DownloadLisense'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_SELECT_DEPLOY_TYPE } from '@router'
import './Documents.module.less'
import DeviceLicense from '@views/Deployment/BySDK/DeviceLicense'
import CloudLicense from '@views/Deployment/BySDK/CloudLicense'

const { Panel } = Collapse;

const Documents: React.FC = () => {
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const navigate = useNavigate()
  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_SELECT_DEPLOY_TYPE
      })
      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE
        }
      )
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>

      </div>
    )
  }, [activePipeLine, navigate])

  return (
    <div styleName='Documents'>
      <div className='Documents_wrap'>
        <ReactCusScrollBar id='Documents'>
          <div className='Documents_content'>
            <Collapse
              defaultActiveKey={['1']}
              expandIconPosition='end'
              accordion
            >
              <Panel header="SDK 调用文档" key="1">
                <SDKDocuments />
              </Panel>
              {/*<Panel header="SDK授权申请" key="2">*/}
              {/*  <ApplyAuth />*/}
              {/*</Panel>*/}
              {/*<Panel header="SDK授权下载" key="3">*/}
              {/*  <DownloadLisense />*/}
              {/*</Panel>*/}
              <Panel header={'SDK 绑定设备授权'} key={'2'}>
                <DeviceLicense />
              </Panel>
              <Panel header={'SDK 云授权'} key={'3'}>
                <CloudLicense />
              </Panel>
            </Collapse>
            <div className='zhanwei'></div>
          </div>
        </ReactCusScrollBar>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default Documents
