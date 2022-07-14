import { ReactCusScrollBar, ModelOpreationTitle, GSelect } from '@src/UIComponents'
import { Form, Input, Select } from 'antd'
import './ConfigForm.module.less'

const { Option } = Select;

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

              <ModelOpreationTitle text="模型对比维度"></ModelOpreationTitle>
              <Form.Item

                name="weidu"

              >
                <GSelect style={{ width: '100%' }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </GSelect>
              </Form.Item>
            </div>
            <div className='forecast_paramas_block'>

              <ModelOpreationTitle text="模型版本选择"></ModelOpreationTitle>
              <Form.Item

                name="username"

              >
                <Input />
              </Form.Item>
            </div>
          </Form>

        </div>
      </ReactCusScrollBar>

    </div>
  )
}

export default ConfigForm
