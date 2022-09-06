import { Collapse } from 'antd';
import { ReactCusScrollBar, GButton, FooterBar } from '@src/UIComponents'
import SDKDocuments from '../SDKDocuments'
// import AuthDocuments from '../AuthDocuments'
import ApplyAuth from '../ApplyAuth'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_SELECT_DEPLOY_TYPE } from '@router'
import './Documents.module.less'

const { Panel } = Collapse;

const Documents = (props: any): JSX.Element => {
  console.log(props)
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

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

            <div className='teching'>教程</div>
            <Collapse
              defaultActiveKey={['1']}
              onChange={onChange}
              expandIconPosition='end'
            >
              <Panel header="SDK调用文档" key="1">
                <SDKDocuments />
              </Panel>
              {/* <Panel header="SDK授权文档" key="2">
                <AuthDocuments />
              </Panel> */}
              <Panel header="SDK授权申请" key="3">
                <ApplyAuth />
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
