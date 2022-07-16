import StepHeaderOfThis from '../StepHeaderOfThis'
import { FooterBar, GButton, ModelOpreationTitle, ReactCusScrollBar } from '@src/UIComponents'
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { Form, message, Pagination, Empty } from 'antd';
import api from '@api'
import { APP_SELECT_DEPLOY_TYPE, APP_SetModuleConfig } from '@router'
import { useNavigate } from 'react-router-dom'
import SelectDevice from './SelectDevice'
import { isEmpty, isNil } from 'lodash';
import { ReactComponent as Gddi } from './icon/gddi.svg'
import './SelectModule.module.less'

const SelectList = (props:any) => {
  const { onChange, device_type } = props
  const [moduleList, setmoduleList] = useState<any[]>([])

  const [selected, setSelected] = useState<any>(undefined)
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

  useEffect(() => {
    const list = Array.from({ length: 40 }).fill('')
    setmoduleList(list)
  }, [])

  const handlePagination = (page: any) => {
    params.current.page = page
    fn()
  }

  const getCls = (data:any) => {
    if (selected?.id === data?.id) {
      return 'module_item module_item_active'
    }

    return 'module_item'
  }

  const handleSelect = (data: any) => {
    setSelected(data)
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

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_SELECT_DEPLOY_TYPE
      })
    }

    const goNext = async () => {
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next
      const data = await form.validateFields()
      console.log(data)
      navigate({
        pathname: APP_SetModuleConfig
      })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [navigate, form])
  return (
    <div styleName='SelectModule'>

      <div className='SelectModule_wrap'>
        <StepHeaderOfThis />
        <div className='SelectModule_content'>

          <Form form={form} name='basic' className='SelectModule_content_from'>
            <div className='select_divice'>
              <ModelOpreationTitle text='硬件设备' />
              <Form.Item
                name="adapter_device"

                rules={
                  [
                    { required: true }
                  ]
                }
                noStyle
              >

                <SelectDevice />
              </Form.Item>
            </div>
            <div className='select_module_wrap'>

              <Form.Item dependencies={['adapter_device']} noStyle>
                {({ getFieldValue }) => {
                  const type = getFieldValue('adapter_device')
                  console.log(type, 'typetype')
                  return (
                    <Form.Item
                      noStyle
                      name='app_template_id'
                      rules={[{ required: true }]}
                    >
                      {
                        isNil(type) || isEmpty(type) ? (
                          <Empty description='请先选择硬件设备' />
                        ) : <SelectList device_type={type[0]} />
                      }
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
