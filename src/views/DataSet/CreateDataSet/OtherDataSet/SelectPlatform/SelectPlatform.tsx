import { useState, useEffect, useMemo } from 'react'
import PlatSelect from './PlatSelect'
import { FooterBar, GButton } from '@src/UIComponents'
import { Select, Form, Spin } from 'antd'
import { isEmpty, isNil } from 'lodash';
import api from '@api'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_CREATE_TYPE } from '@router'
import './SelectPlatform.module.less'

const { Option } = Select;
type Props={
    setThirdInfo:any,
    setCurrentStep:any,
    thirdInfo:any,
    setInitPageInfo:any
}
const SelectPlatform = (props: Props): JSX.Element => {
  console.log(props)
  const { setThirdInfo, setInitPageInfo, thirdInfo, setCurrentStep } = props
  const navigate = useNavigate()
  const [userList, setUserList] = useState<any[]>([]);
  const [companyList, setcompanyList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();

  useEffect(() => {
    const fn = async () => {
      const res = await api.get('/v3/oauth/platforms')
      if (res.code === 0) {
        setcompanyList(res?.data)
      }
    }
    fn()
  }, [])

  useEffect(() => {
    if (!isEmpty(thirdInfo)) {
      form.setFieldsValue({ ...thirdInfo })
    }
  }, [thirdInfo, form])

  const fetchUserList = async (platform: string) => {
    try {
      setLoading(true)
      const res = await api.get(`/v3/oauth/platforms/${platform}/connections`)
      if (res.code === 0) {
        setUserList(res.data || [])
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handlePartyChange = (select: any, option:any) => {
    form.setFieldsValue({

      user: undefined
    })

    fetchUserList(select)
    setInitPageInfo(option)
  }

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_DATASET_CREATE_TYPE
      })
    }

    const goNext = async () => {
      // 123
      const data = await form.validateFields()
      setThirdInfo(data)
      setCurrentStep(2)
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [form, navigate, setThirdInfo, setCurrentStep])

  return (
    <div styleName='SelectPlatform'>
      <div className='SelectPlatform_wrap'>
        <Spin spinning={loading}>
          <Form
            form={form}
            name='ThirdPartyForm'
            className='ThirdPartyForm'
          >

            <Form.Item
              label='第三方平台'
              name='source'
              rules={[{ required: true }]}
            >
              <PlatSelect companyList={companyList} handlePartyChange={handlePartyChange}/>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={true}
            >

              {
                ({ getFieldValue }) => {
                  const plat = getFieldValue('source');
                  console.log(plat, 'platplat')
                  const disabled = isEmpty(plat) || isNil(plat)
                  return (
                    <Form.Item
                      label='账号选择'
                      name='user_open_id'
                      //   rules={[{ required: true }]}
                      shouldUpdate={true}
                    >
                      <Select disabled={disabled} placeholder='请选择账号' >

                        {
                          userList.map((o: any) => {
                            return (
                              <Option value={o.open_id} key={o.id}>{o.open_username}</Option>
                            )
                          })
                        }
                      </Select>
                    </Form.Item>
                  )
                }
              }
            </Form.Item>

          </Form>
        </Spin>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SelectPlatform
