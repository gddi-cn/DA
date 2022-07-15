import { ReactCusScrollBar, ModelOpreationTitle, GSelect } from '@src/UIComponents'
import { Form, Select } from 'antd'
import './ConfigForm.module.less'

const { Option } = Select;

const children: React.ReactNode[] = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const ConfigForm = (): JSX.Element => {
  return (
    <div styleName='ConfigForm'>
      <ReactCusScrollBar id='ReactCusScrollBar'>

        <div className='ConfigForm_wrap'>
          <Form
            name="basic"

            autoComplete="off"
          >
            <div className='forecast_paramas_block'>

              <ModelOpreationTitle text="基准选择"></ModelOpreationTitle>
              <Form.Item

                name="dataset_version"

              >
                <GSelect style={{ width: '100%' }}>
                  <Option value="1">v1</Option>
                  <Option value="2">v2</Option>
                </GSelect>
              </Form.Item>
            </div>
            <div className='forecast_paramas_block'>

              <ModelOpreationTitle text="模型对比维度"></ModelOpreationTitle>
              <Form.Item

                name="config_type"

              >
                <GSelect style={{ width: '100%' }}>
                  <Option value="1">模型版本</Option>
                  <Option value="2">阈值</Option>
                </GSelect>
              </Form.Item>
            </div>
            <div className='forecast_paramas_block'>
              <ModelOpreationTitle text="参数选择"></ModelOpreationTitle>
              <Form.Item dependencies={['config_type']} noStyle>
                {({ getFieldValue }) => {
                  const type = getFieldValue('config_type')
                  console.log(type, 'typetype')
                  if (type === '2') {
                    return (
                      <span >
                        <Form.Item
                          label='阈值'
                          name="thres_m"

                        >
                          <GSelect
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}

                          >
                            {children}
                          </GSelect>
                        </Form.Item>
                        <Form.Item
                          label='模型版本'
                          name="version_s"

                        >
                          <GSelect style={{ width: '100%' }}>
                            <Option value="1">模型版本</Option>
                            <Option value="2">阈值</Option>
                          </GSelect>
                        </Form.Item>

                      </span>
                    )
                  }
                  return (
                    <span >
                      <Form.Item
                        label='模型版本'
                        name="version_m"

                      >
                        <GSelect
                          mode="multiple"
                          allowClear
                          style={{ width: '100%' }}
                          placeholder="Please select"
                          defaultValue={['a10', 'c12']}

                        >
                          {children}
                        </GSelect>
                      </Form.Item>
                      <Form.Item
                        label='阈值'
                        name="thres_s"

                      >
                        <GSelect style={{ width: '100%' }}>
                          <Option value="1">模型版本</Option>
                          <Option value="2">阈值</Option>
                        </GSelect>
                      </Form.Item>
                    </span>
                  )
                }}
              </Form.Item>

            </div>
          </Form>

        </div>
      </ReactCusScrollBar>

    </div>
  )
}

export default ConfigForm
