import { Select, Form, Modal } from 'antd'
import { FooterBar, GButton, GSelect } from '@src/UIComponents'
import { useMemo, useState, useCallback, useEffect } from 'react'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { APP_THIRDPARTY_STEP_1, APP_THIRDPARTY_STEP_3 } from '@router'
import { useNavigate } from 'react-router-dom'
import api from '@api'
import Qs from 'qs'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './SelectProject.module.less'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

const { Option } = Select;

const SelectProject = (): JSX.Element => {
  // const initPageInfo = { name: 'manfu' }
  const [form] = Form.useForm();
  // const thirdInfo = { user_open_id: '123' }
  const [proList, setProList] = useState<any[]>([]);

  const navigate = useNavigate()

  const stepOneData = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine?.APP_THIRDPARTY_STEP_1 || {}
  })

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const hanldeGotoAuth = useCallback(
    async () => {
      const plat = stepOneData?.source
      const res = await api.get(`/v3/oauth/platforms/${plat}/url`)
      if (res.code === 0) {
        const { data: { url } } = res
        // const _url = new URL(url)
        // const query = Qs.parse((_url.search as string).substr(1))
        // console.log(query, 'query')
        window.open(
          url,
          'DescriptiveWindowName',
          'width=1200,height=600,resizable,scrollbars=yes,status=1,top=250'
        );
      }
    },
    [stepOneData]
  )
  const fetchProList = useCallback(
    async () => {
      try {
        if (!stepOneData?.user_open_id) {
          return
        }

        // 不能写死mindflow
        const res = await api.get(`/v3/mindflow/${stepOneData?.user_open_id}/exports`, {
          params: {
            page_size: 99999,
            scene: activePipeLine?.APP_THIRDPARTY_SelectTrainType?.activeType
          }
        })
        if (res.code === 0) {
          setProList(res.data.items || [])
        }

        if (res.code === 401006) {
          Modal.confirm({
            title: '温馨提示',
            icon: <ExclamationCircleOutlined />,
            content: '第三方授权已过期，是否重新授权？',
            getContainer: false,
            onOk () {
              hanldeGotoAuth()
              return Promise.resolve()
            },
            onCancel () {
              console.log('Cancel');
              return Promise.resolve()
            },
          });
        }
      } catch (e) {

      }
    }, [hanldeGotoAuth, stepOneData?.user_open_id, activePipeLine]
  )

  const fn = useCallback(async (e: MessageEvent) => {
    // console.log(e, 1111111111111)
    const plat = stepOneData?.source
    if (e.origin !== window.location.origin) {
      return
    }
    const { data: eventData } = e
    // console.log(eventData)
    const {
      type: reqMsgType, payload
    } = eventData

    if (reqMsgType === 'getThirdPartyInfo') {
      // console.log(payload)
      const { search } = payload

      const query = Qs.parse((search as string).substr(1))
      // console.log(query, 'query')
      try {
        const res = await api.post(`/v3/oauth/platforms/${plat}/connections`, { auth_code: query.code })
        if (res.code === 0) {
          fetchProList()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [fetchProList, stepOneData?.source])

  useEffect(() => {
    window.addEventListener('message', fn, false)
  }, [fn])

  useEffect(() => {
    return () => {
      window.removeEventListener('message', fn)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const init = async () => {
      await fetchProList()
      if (activePipeLine?.APP_THIRDPARTY_STEP_2) {
        form.setFieldsValue(activePipeLine?.APP_THIRDPARTY_STEP_2)
      }
    }
    init()
    // proParams.current = {}
  }, [activePipeLine, fetchProList, form])

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
      socketPushMsgForProject(activePipeLine, {
        // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_STEP_3
      })
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [activePipeLine, form, navigate])

  // const handleChange = (changeValue: any, all_values: any) => {
  //   socketPushMsgForProject(activePipeLine, {
  //     // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
  //     APP_THIRDPARTY_STEP_2: all_values
  //   })
  // }

  const handleOnSelect = (value:any, option:any) => {
    console.log(option, 'option')
    const { data_value } = option
    socketPushMsgForProject(activePipeLine, {
      // active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
      APP_THIRDPARTY_STEP_2: data_value
    })
  }

  return (
    <div styleName='SelectProject'>
      <div className='SelectProject_wrap'>
        <div className='party_name'>
          {stepOneData?.source || '--'}
        </div>
        <div className='user_id_wrap'>
          账号：{stepOneData?.user_open_id || '--'}
        </div>

        <div className='select_wrap'>
          <Form
            form={form}
            name='ThirdPartyForm'
            className='ThirdPartyForm'
            // onValuesChange={handleChange}
          >

            <Form.Item
              label='选择项目'
              name='url'
              rules={[{ required: true }]}
            >
              <GSelect placeholder='未选择' onSelect={handleOnSelect}>
                {
                  proList.map((o: any) => {
                    return (
                      <Option data_value={o} value={o.url} key={o.md5}>{o.name}</Option>
                    )
                  })
                }
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
