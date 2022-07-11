import { Select, Form } from 'antd'
import { FooterBar, GButton, GSelect } from '@src/UIComponents'
import { useMemo } from 'react'
import { APP_THIRDPARTY_STEP_1, APP_THIRDPARTY_STEP_3 } from '@router'
import { useNavigate } from 'react-router-dom'
import './SelectProject.module.less'

const { Option } = Select;

const SelectProject = (): JSX.Element => {
  const initPageInfo = { name: 'manfu' }
  const thirdInfo = { user_open_id: '123' }

  const navigate = useNavigate()

  const [form] = Form.useForm();

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_THIRDPARTY_STEP_1
      })
    }

    const goNext = async () => {
      // 123
      const data = await form.validateFields()
      console.log(data)
      navigate({
        pathname: APP_THIRDPARTY_STEP_3
      })
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [form, navigate])

  return (
    <div styleName='SelectProject'>
      <div className='SelectProject_wrap'>
        <div className='party_name'>
          {initPageInfo?.name || '--'}
        </div>
        <div className='user_id_wrap'>
            账号：{thirdInfo?.user_open_id || '--'}
        </div>

        <div className='select_wrap'>
          <Form
            form={form}
            name='ThirdPartyForm'
            className='ThirdPartyForm'
          >

            <Form.Item
              label='选择项目'
              name='url'
              rules={[{ required: true }]}
            >
              <GSelect placeholder='未选择' >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </GSelect>
            </Form.Item>
          </Form>

        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SelectProject
