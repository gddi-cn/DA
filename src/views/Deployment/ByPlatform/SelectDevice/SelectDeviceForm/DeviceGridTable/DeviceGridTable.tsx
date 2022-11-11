import { Checkbox, Empty, Spin, Tooltip } from 'antd'
import { useState, useCallback, useEffect, useRef } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import ApplyAuthForm from '../ApplyAuthForm'
import { isNil, isEmpty } from 'lodash'
import api from '@api'
import './DeviceGridTable.module.less'

const column: any[] = [

  {
    label: '设备名称',
  },
  {
    label: '设备SN',
  },
  {
    label: '设备类型',
  },
  {
    label: 'AI芯片型号',
  },
  {
    label: '设备状态',
  },
  {
    label: '授权状态',
    className: 'DeviceGridTable_header_item_auth'
  },
]

const DeviceGridTable = (props: any): JSX.Element => {
  const { group_id, app_id, onChange, value } = props

  const [dataSource, setDataSource] = useState<any[]>([]); // 数据
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([])

  const previousId = useRef<undefined | '' | number>(undefined)
  const params = useRef({
    page: 1,
    page_size: 1000,
    name: '',

  })

  useEffect(() => {
    // 这个损耗一定性能\但是不管咯,先简单粗暴
    setSelectedRowKeys(value || [])
  }, [value])

  const fetchFn = useCallback(
    async () => {
      // 如果不等于上一个selected,init参数
      console.log(group_id)
      if (isNil(group_id)) {
        setDataSource([])
        return
      }
      console.log(group_id)
      if (previousId.current !== group_id) {
        previousId.current = group_id
        params.current = Object.assign(params.current, {
          page: 1,

        })
      }
      try {
        setLoading(true);
        const res = await api.get('/v3/devices', { params: { app_id, group: group_id, ...params.current } })
        if (res.code === 0) {
          const { items } = res.data
          setDataSource(items || [])
          setLoading(false)
        }
      } catch (e) {
        console.log(e, 111)
        setLoading(false)
      }
    }, [app_id, group_id]
  )
  useEffect(() => {
    fetchFn()
  }, [fetchFn])

  const getState = (state: 'online' | 'offline' | 'deleted') => {
    switch (state) {
    case 'online':
      return '在线'
    case 'offline':
      return (
        <Tooltip title='设备未连接到训练平台'>
          <span style={{ color: '#ff6177' }}>
            离线
          </span>
        </Tooltip>
      )
    case 'deleted':
      return '已注销'
    default:
      return ''
    }
  }

  const getModelAuth = (data:any) => {
    const objText: any = {
      Authorized: '已授权',
      Unauthorized: '未授权',
      NotMatch: '设备不匹配',
      Applied: '已申请'
    }

    const clsText: any = {
      Authorized: 'Authorized',
      Unauthorized: 'unAuthorized',
      NotMatch: 'unAuthorized',
      Applied: 'Applied'
    }

    const getBtn = () => {
      if (data?.ModelAuth === 'Unauthorized') {
        return (
          <ApplyAuthForm id={data?.id} fetchFn={fetchFn} app_id={app_id}/>

        )
      }
      return null
    }

    return (
      <div className='ModelAuth_wrap'>
        <div className={clsText[data?.ModelAuth] || 'unAuthorized'}>{objText[data?.ModelAuth] || '未授权'}</div>
        {getBtn()}
      </div>
    )
  }

  const getView = () => {
    if (loading) {
      return (
        <div className='loading_wrap'>
          <Spin></Spin>
          <p>正在加载数据……</p>
        </div>
      )
    }

    if (isEmpty(dataSource)) {
      return (
        <div className='loading_wrap'>
          <Empty />

        </div>
      )
    }

    const hasOption = (option: any) => {
      return !!selectedRowKeys.find((o) => o === option?.id)
    }

    const handleSingleChange = (e: CheckboxChangeEvent, data:any) => {
      console.log(`checked = ${e.target.checked}`);

      console.log(data)

      const checked = e.target.checked
      if (checked) {
        const list = [...selectedRowKeys, data?.id]
        setSelectedRowKeys(list)
        onChange && onChange(list)
      } else {
        if (hasOption(data)) {
          const index = selectedRowKeys.findIndex((o) => o === data?.id)
          if (index !== -1) {
            selectedRowKeys.splice(index, 1)
            const list = [...selectedRowKeys]
            setSelectedRowKeys(list)
            onChange && onChange(list)
          }
        }
      }
    };

    const getStatusCheckbox = (data: any) => {
      if (data && data.ModelAuth === 'Authorized' && data.state === 'online') {
        const index = selectedRowKeys.findIndex((o:any) => o === data.id)
        const checked = index !== -1
        return (
          <Checkbox onChange={(e: CheckboxChangeEvent) => handleSingleChange(e, data)} checked={checked}/>
        )
      }

      return (
        <Checkbox disabled />
      )
    }

    return (
      <div className='DeviceGridTable_body'>

        {
          dataSource.map((data, index) => {
            return (
              <div key={index} className='DeviceGridTable_body_item'>
                <div className='DeviceGridTable_body_item_wrap_select'>{getStatusCheckbox(data)}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.name || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.sn || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.type || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.chip || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{getState(data?.state)}</div>
                <div className='DeviceGridTable_body_item_wrap_auth'>{getModelAuth(data)}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    const value = e.target.checked
    if (value) {
      const list = dataSource.filter((o) => o?.ModelAuth === 'Authorized').map((o) => o.id)
      setSelectedRowKeys(list)
      onChange && onChange(list)
    } else {
      setSelectedRowKeys([])
      onChange && onChange([])
    }
  }

  const getALLSelect = () => {
    const canSelect = () => {
      if (isEmpty(dataSource)) {
        return true
      }
      const boolValue = dataSource.some((data) => {
        return data?.ModelAuth === 'Authorized'
      })

      return !boolValue
    }

    const disabled = canSelect()

    if (disabled) {
      return (
        <Checkbox disabled />
      )
    } else {
      const list = dataSource.filter((o) => o?.ModelAuth === 'Authorized')

      const checked = selectedRowKeys?.length === list?.length

      const indeterminate = () => {
        if (checked) {
          return false
        }
        return selectedRowKeys.length >= 1
      }
      return <Checkbox indeterminate={indeterminate()} checked={checked} onChange={handleSelectAll}/>
    }
  }
  return (
    <div styleName='DeviceGridTable'>
      <div className='DeviceGridTable_header'>
        <div className='DeviceGridTable_header_item_select'>{getALLSelect()}</div>
        {
          column.map((data, index) => {
            const { className } = data
            return (
              <div key={index} className={className || 'DeviceGridTable_header_item'}>
                {data.label}
              </div>
            )
          })
        }
      </div>
      {getView()}
    </div>
  )
}

export default DeviceGridTable
