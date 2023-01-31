import React from 'react'
import { Input, message } from 'antd'

import { useDeviceGroupSelector } from './hook'
import RemoteSearch from '@src/components/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { PrimaryBtn } from '@src/components/Button'
import { DeviceType } from '@src/shared/enum/device'

const getExtendOptions = (refresh: () => void) => {
  const [name, setName] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleAdd = async () => {
    if (loading) return
    if (!name) return message.warn('请输入分组名称')

    setLoading(true)

    const { success } = await deviceGroupAPI.create(name, DeviceType.EDGE)

    setLoading(false)

    if (success) {
      message.success('创建成功')
      setName('')
    }

    refresh()
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <Input
          placeholder={'请输入分组名称'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          bordered={false}
          width={'100%'}
        />
      </div>
      <PrimaryBtn loading={loading} onClick={handleAdd} fw={400}>添加</PrimaryBtn>
    </div>
  )
}

const DeviceGroupSelector: React.FC = () => {
  const { selectedDeviceGroup, onFirstLoad, handleChange, edgeGroupSelectorRef } = useDeviceGroupSelector()

  return (
    <RemoteSearch<DeviceGroupOptions>
      ref={edgeGroupSelectorRef}
      style={{ width: 220, borderRadius: 4 }}
      value={selectedDeviceGroup || undefined}
      showSearch
      fetchOptions={deviceGroupAPI.fetchEdgeDeviceGroupByName}
      onChange={handleChange}
      onFirstLoad={onFirstLoad}
      getExtendOptions={getExtendOptions}
    />
  )
}

export default DeviceGroupSelector
