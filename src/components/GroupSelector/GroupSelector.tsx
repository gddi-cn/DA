import React from 'react'
import { Input, message } from 'antd'

import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import RemoteSearch, { RemoteSearchRef } from '@src/components/RemoteSearch'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { DeviceType } from '@src/shared/enum/device'
import { PrimaryBtn } from '@src/components/Button'
import { chipBrandLittleLogoMapping } from '@src/shared/mapping/chip'


export interface GroupSelectorProps {
  value: DeviceGroupOptions | null
  onChange: (value: DeviceGroupOptions) => void
  remoteSearchRef?: React.ForwardedRef<RemoteSearchRef>
  width?: React.CSSProperties['width']
  borderRadius?: number
  selectDefault?: boolean
  chipId?: Device.Chip.Instance['key']
}

const getExtendOptions = (refresh: () => void) => {
  const [name, setName] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleAdd = async () => {
    if (loading) return
    if (!name) return message.warn('请输入分组名称')

    setLoading(true)
    const { success } = await deviceGroupAPI.create(name, DeviceType.EDGE)
    setLoading(false)

    refresh()

    if (!success) return

    message.success('创建成功')
    setName('')
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <Input
          placeholder='请输入分组名称'
          value={name}
          onChange={e => setName(e.target.value.replace(/\s+/g, ''))}
          bordered={false}
          width={'100%'}
        />
      </div>
      <PrimaryBtn loading={loading} onClick={handleAdd} fw={400}>添加</PrimaryBtn>
    </div>
  )
}


const GroupSelector: React.FC<GroupSelectorProps> = (
  {
    value,
    onChange,
    width = 220,
    borderRadius = 4,
    remoteSearchRef,
    selectDefault = false,
    chipId,
  }
) => {

  const onFirstLoad = React.useCallback(
    (o: any[]) => {
      if (value) return
      const [defaultGroup] = o.filter(x => x.value === 0)
      onChange(defaultGroup || null)
    },
    [onChange, value]
  )

  return (
    <RemoteSearch<DeviceGroupOptions>
      ref={remoteSearchRef}
      style={{ width, borderRadius }}
      value={value || undefined}
      showSearch
      fetchOptions={(name) => deviceGroupAPI.fetchDeviceGroupByName(name, chipId)}
      onChange={onChange}
      onFirstLoad={selectDefault ? onFirstLoad : undefined}
      getExtendOptions={getExtendOptions}
    />
  )
}

export default GroupSelector
