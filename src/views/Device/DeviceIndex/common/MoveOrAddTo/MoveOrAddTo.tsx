import { useState, useRef, useCallback, useEffect } from 'react'
import { Popover, Select, message, Spin } from 'antd'
import { GSelect } from '@src/UIComponents'
import api from '@api'
import './MoveOrAddTo.module.less'

const { Option } = Select;

const MoveOrAddTo = (props: any): JSX.Element => {
  const { children, type, groupId, deviceId, fetchDeviceList, doMethod } = props
  const [visible, setvisible] = useState(false)
  const [dataList, setDataList] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  const params = useRef({
    page: 1,
    page_size: 99999,
    // type,
    name: '',

  })

  const fetchData = useCallback(
    async () => {
      //   setLoading(true)
      try {
        // if (arg?.isInit) {
        //   setDataList([])
        // }

        const res = await api.get('/v3/devicegroups', { params: { ...params.current, type } })
        if (res.code === 0) {
          const { data: { items } } = res

          setDataList(items || [])
        } else {
          message.error(res.message)
        }

        // setLoading(false)
      } catch (e) {
        console.log(e)

        // setLoading(false)
        // 应该不用重新请求这么离谱吧，也是个迷惑性的地方
      }
    },
    [type]
  )

  useEffect(() => {
    if (visible) {
      fetchData()
    }
  }, [fetchData, visible])

  const handleVisibleChange = (visible: boolean) => {
    setvisible(visible);
  };

  const onChange = async (value:any) => {
    //   page: 1,
    //       page_size: 10,
    //           sort_by_expire: undefined,
    //               sort_by_status: undefined,
    //                   name: undefined
    console.log(`selected ${value}`);
    setLoading(true)
    try {
      const mehtod = doMethod === 'move'
        ? api.put(`/v3/devicegroups/${groupId}/devices/${deviceId}/copy`, { dest_id: value })
        : api.put(`/v3/devicegroups/${groupId}/devices/${deviceId}/move`, { dest_id: value })
      const res = await mehtod
      if (res.code === 0) {
        setvisible(false)
        message.success(res?.message)
        fetchDeviceList()
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const onSearch = (val:any) => {
    console.log('search:', val);
    params.current = Object.assign(params.current, { name: val })
    fetchData()
  }

  const ContentForm = () => {
    return (
      <div className='ContentForm'>
        <Spin spinning={loading}>
          <GSelect
            className='ContentForm_select'
            showSearch
            placeholder="选择设备组"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              dataList.map((o: any) => {
                return (
                  <Option key={o.id} value={o.id}>{o.name}</Option>
                )
              })
            }

          </GSelect>
        </Spin>

      </div>
    )
  }
  return (
    <div styleName='MoveOrAddTo' className='op_item' >

      <Popover
        content={(
          <ContentForm />
        )}
        title={null}
        trigger='click'
        placement='top'
        autoAdjustOverflow
        visible={visible}
        getPopupContainer={(triggerNode: HTMLElement) => (triggerNode as any).parentNode}
        onVisibleChange={handleVisibleChange}
        destroyTooltipOnHide
      >
        {children}
      </Popover>
    </div>
  )
}

export default MoveOrAddTo
