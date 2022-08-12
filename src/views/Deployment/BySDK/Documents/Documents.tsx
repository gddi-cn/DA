import { Collapse } from 'antd';
import { ReactCusScrollBar } from '@src/UIComponents'
import SDKDocuments from '../SDKDocuments'
// import AuthDocuments from '../AuthDocuments'
import ApplyAuth from '../ApplyAuth'
import './Documents.module.less'

const { Panel } = Collapse;

const Documents = (props: any): JSX.Element => {
  console.log(props)
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

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

    </div>
  )
}

export default Documents
