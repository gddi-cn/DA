import { Checkbox, Empty, Spin } from 'antd'
import { useState } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { isEmpty } from 'lodash'

import './DeviceGridTable.module.less'
// import { SmallButton } from '@src/UIComponents';

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
  // {
  //   label: '操作',

  // },
]

const DeviceGridTable = (props: any): JSX.Element => {
  const { dataSource, onChange, loading } = props

  // const [dataSource, setDataSource] = useState<any[]>([]); // 数据

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([])

  // useEffect(() => {
  //   // 这个损耗一定性能\但是不管咯,先简单粗暴
  //   setSelectedRowKeys(value || [])
  // }, [value])

  const getState = (state: any) => {
    const objText: any = {
      online: '在线',
      offline: '离线',
      deleted: '已注销'
    }
    return objText[state] || '-'
  }

  const getModelAuth = (ModelAuth: any) => {
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
      Applied: 'unAuthorized'
    }

    return (
      <div className='ModelAuth_wrap'>
        <div className={clsText[ModelAuth] || 'unAuthorized'}>{objText[ModelAuth] || '未授权'}</div>

      </div>
    )
  }

  // const getDownloadBtn = (ModelAuth: any) => {
  //   return (
  //     <SmallButton type='primary' className='' disabled={ModelAuth !== 'Authorized'}>下载</SmallButton>
  //   )
  // }

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

    const handleSingleChange = (e: CheckboxChangeEvent, data: any) => {

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
      if (data?.ModelAuth === 'Unauthorized') {
        const index = selectedRowKeys.findIndex((o: any) => o === data.id)
        const checked = index !== -1
        return (
          <Checkbox onChange={(e: CheckboxChangeEvent) => handleSingleChange(e, data)} checked={checked} />
        )
      }

      return (
        <Checkbox disabled />
      )
    }

    return (
      <div className='DeviceGridTable_body'>

        {
          dataSource.map((data: any, index: any) => {
            return (
              <div key={index} className='DeviceGridTable_body_item'>
                <div className='DeviceGridTable_body_item_wrap_select'>{getStatusCheckbox(data)}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.name || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.sn || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.type || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{data?.chip || '-'}</div>
                <div className='DeviceGridTable_body_item_wrap'>{getState(data?.state)}</div>
                <div className='DeviceGridTable_body_item_wrap_auth'>{getModelAuth(data?.ModelAuth)}</div>
                {/* <div className='DeviceGridTable_body_item_wrap'>{getDownloadBtn(data?.ModelAuth)}</div> */}
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
      const list = dataSource.filter((o: any) => o?.ModelAuth === 'Unauthorized').map((o: any) => o.id)
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
      const boolValue = dataSource.some((data: any) => {
        return data?.ModelAuth === 'Unauthorized'
      })

      return !boolValue
    }

    const disabled = canSelect()

    if (disabled) {
      return (
        <Checkbox disabled />
      )
    } else {
      const list = dataSource.filter((o: any) => o?.ModelAuth === 'Unauthorized')

      const checked = selectedRowKeys?.length === list?.length

      const indeterminate = () => {
        if (checked) {
          return false
        }
        return selectedRowKeys.length >= 1
      }
      return <Checkbox indeterminate={indeterminate()} checked={checked} onChange={handleSelectAll} />
    }
  }
  return (
    <div styleName='DeviceGridTable'>
      <div className='DeviceGridTable_header'>
        <div className='DeviceGridTable_header_item_select'>{getALLSelect()}</div>
        {
          column.map((data, index) => {
            // const { className } = data
            return (
              <div key={index} className='DeviceGridTable_header_item'>
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
