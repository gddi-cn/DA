import StepHeaderOfThis from '../StepHeaderOfThis'
import { FooterBar, GButton, ModelOpreationTitle, ReactCusScrollBar } from '@src/UIComponents'
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { Form, message, Pagination, Empty } from 'antd';
import api from '@api'
import { APP_SELECT_DEPLOY_TYPE, APP_SetModuleConfig } from '@router'
import { useNavigate } from 'react-router-dom'
import SelectDevice from './SelectDevice'
import { isEmpty } from 'lodash';
import { ReactComponent as Gddi } from './icon/gddi.svg'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './SelectModule.module.less'

const SelectList = (props:any) => {
  const { onChange, device_type, value } = props
  const [moduleList, setmoduleList] = useState<any[]>([])

  // const [selected, setSelected] = useState<any>(undefined)
  const [total, setTotal] = useState(0)
  const params = useRef({
    page_size: 12,
    page: 1,

  })
  const fn = useCallback(
    async () => {
      try {
        const _params = Object.assign({}, { device_type }, params.current)
        const res = await api.get('/v3/apptemplates', { params: _params })
        if (res.code === 0) {
          const list = res.data.items
          setmoduleList(list || [])
          setTotal(res.data.total)
        } else {
          message.error(res?.message)
        }
      } catch (e: any) {
        message.error(e?.message || e)
      }
    }, [device_type]
  )

  useEffect(() => {
    fn()
  }, [fn])

  const handlePagination = (page: any) => {
    params.current.page = page
    fn()
  }

  const getCls = (data:any) => {
    if (value === data?.id) {
      return 'module_item module_item_active'
    }

    return 'module_item'
  }

  const handleSelect = (data: any) => {
    onChange && onChange(data?.id || '-')
  }
  return (
    <div className='SelectList'>
      <ReactCusScrollBar id='ReactCusScrollBar'>
        {
          isEmpty(moduleList) ? <div><Empty /></div> : (
            <div className='SelectList_wrap'>
              {
                moduleList.map((o, i) => {
                  return (
                    <div key={i} className={getCls(o)} onClick={() => handleSelect(o)}>
                      <Gddi className='logo'/>
                      <div className='item_info_wrap'>
                        <div className='info_wrap'>
                          <div className='title'>模板名称</div>
                          <div className='name'>
                            {o?.name || ''}
                          </div>
                        </div>
                        <div className='info_wrap'>
                          <div className='title'>描述</div>
                          <div className='description'>
                            {o?.description || ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }

      </ReactCusScrollBar>
      {
        total > 12 && (
          <div className='templates_Pagination_wrap'>
            <Pagination total={total} size="small" hideOnSinglePage showSizeChanger={false} pageSize={12} onChange={handlePagination} />
          </div>
        )
      }
    </div>
  )
}

const SelectModule = (): JSX.Element => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  useEffect(() => {
    if (!isEmpty(activePipeLine?.APP_SelectModule)) {
      form.setFieldsValue(activePipeLine?.APP_SelectModule)
    }
  }, [activePipeLine, form])

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

    const goNext = async () => {
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next
      try {
        const formData = await form.validateFields()

        const { adapter_device, ...rest } = formData
        let parmas = {

        }

        if (isEmpty(adapter_device)) {
          parmas = {
            name: '0.6无命名应用',
            adapter_device: undefined,
            ...rest
          }
        } else {
          parmas = {
            name: '0.6无命名应用',
            adapter_device: adapter_device[adapter_device.length - 1],
            ...rest
          }
        }
        try {
          setLoading(true)
          const res = await api.post('/v3/apps', parmas)
          if (res.code === 0) {
            message.success('创建成功')
            setLoading(false)

            // 创建了给下一步赋值应用信息
            socketPushMsgForProject(
              activePipeLine, {
                active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SetModuleConfig,
                APP_SetModuleConfig: res?.data
              }
            )
            navigate({
              pathname: APP_SetModuleConfig
            })
          } else {
            message.error(res?.message)
            setLoading(false)
          }
        } catch (e) {
          console.log(e)
          setLoading(false)
        }
      } catch (e) {

      }
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext} loading={loading}>下一步</GButton>
      </div>
    )
  }, [loading, navigate, activePipeLine, form])

  const handleAllChange = (changeValue:any, all_value:any) => {
    console.log(all_value)

    if (Object.prototype.hasOwnProperty.call(changeValue, 'adapter_device')) {
      form.setFieldsValue({
        app_template_id: undefined
      })
      const _data = Object.assign(all_value, {
        app_template_id: undefined
      })
      socketPushMsgForProject(
        activePipeLine, {
          APP_SelectModule: _data
        }
      )

      return
    }

    socketPushMsgForProject(
      activePipeLine, {
        APP_SelectModule: all_value
      }
    )
  }
  return (
    <div styleName='SelectModule'>

      <div className='SelectModule_wrap'>
        <StepHeaderOfThis />
        <div className='SelectModule_content'>

          <Form form={form} name='basic' className='SelectModule_content_from' onValuesChange={handleAllChange}>
            <div className='select_divice'>
              <ModelOpreationTitle text='硬件设备' />
              <Form.Item
                name="adapter_device"

                rules={
                  [
                    { required: true, message: '请选择硬件设备' }
                  ]
                }

              >

                <SelectDevice />
              </Form.Item>
            </div>
            <div className='select_module_wrap'>

              <Form.Item dependencies={['adapter_device']} >
                {({ getFieldValue }) => {
                  const type = getFieldValue('adapter_device')
                  console.log(type, 'typetype')
                  return (
                    <Form.Item
                      noStyle
                      name='app_template_id'
                      rules={[{ required: true, message: '请选择应用模板' }]}
                    >
                      <SelectList device_type={type ? type[0] : undefined} />
                    </Form.Item>
                  )
                }}
              </Form.Item>
            </div>
          </Form>

        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SelectModule
