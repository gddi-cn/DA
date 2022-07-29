import { useState, useEffect, useMemo } from 'react'
import PlatSelect from './PlatSelect'
import { FooterBar, GButton } from '@src/UIComponents'
import { Select, Form, Spin } from 'antd'
import { isEmpty, isNil } from 'lodash';
import api from '@api'
import { useNavigate } from 'react-router-dom'
import { APP_THIRDPARTY_SelectTrainType, APP_THIRDPARTY_STEP_2 } from '@router'

import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './SelectPlatform.module.less'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants';

const { Option } = Select;

const SelectPlatform = (): JSX.Element => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [userList, setUserList] = useState<any[]>([]);
  const [companyList, setcompanyList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
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
  useEffect(() => {
    if (activePipeLine?.APP_THIRDPARTY_STEP_1) {
      form.setFieldsValue(activePipeLine.APP_THIRDPARTY_STEP_1)

      fetchUserList(activePipeLine?.APP_THIRDPARTY_STEP_1?.source)
    }
  }, [form, activePipeLine])

  useEffect(() => {
    const fn = async () => {
      const res = await api.get('/v3/oauth/platforms')
      if (res.code === 0) {
        setcompanyList(res?.data)
      }
    }
    fn()
  }, [])

  const handlePartyChange = (select: any, option:any) => {
    form.setFieldsValue({

      user: undefined
    })

    fetchUserList(select)

    console.log(option, 'option')
  }

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_THIRDPARTY_SelectTrainType
      })
      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_SelectTrainType
      })
    }

    const goNext = async () => {
      // 123
      const data = await form.validateFields()
      console.log(data)
      navigate({
        pathname: APP_THIRDPARTY_STEP_2
      })
      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_STEP_2
      })
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [form, navigate, activePipeLine])

  const handleFormChange = (changeValue: any, all_values: any) => {
    if (Object.prototype.hasOwnProperty.call(changeValue, 'source')) {
      // form.setFieldsValue({
      //   app_template_id: undefined
      // })
      const _data = Object.assign(all_values, {
        user: undefined
      })
      socketPushMsgForProject(activePipeLine, {
        // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
        APP_THIRDPARTY_STEP_1: _data
      })
      return
    }

    socketPushMsgForProject(activePipeLine, {
      // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
      APP_THIRDPARTY_STEP_1: all_values
    })
  }

  return (
    <div styleName='SelectPlatform'>
      <div className='SelectPlatform_wrap'>
        <Spin spinning={loading}>
          <Form
            form={form}
            name='ThirdPartyForm'
            className='ThirdPartyForm'
            onValuesChange={handleFormChange}
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
                      rules={[{ required: true }]}
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
