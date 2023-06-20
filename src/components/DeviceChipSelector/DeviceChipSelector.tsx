import React from 'react'
import RemoteSearch from '@src/components/RemoteSearch'
import deviceAPI from '@src/apis/device'

export interface DeviceChipSelectorProps {
  onChange?: (newValue?: Device.Chip.Option) => void
  value?: Device.Chip.Option
  allClear?: boolean
  placeholder?: string
  defaultMostApp?: boolean
}

const DeviceChipSelector: React.FC<DeviceChipSelectorProps> = (
  {
    value,
    onChange,
    allClear = false,
    placeholder = '全部设备类型',
    defaultMostApp = false
  }
) => {
  const onFirstLoad = React.useCallback(
    (o: Array<Device.Chip.Option>) => {
      if (value) return
      if (!defaultMostApp) return
      if (!o.length) return
      onChange  && onChange(o[0])
    },
    [defaultMostApp, onChange, value]
  )

  return (
    <RemoteSearch<Device.Chip.Option>
      fetchOptions={deviceAPI.fetchChipTypeByNameOrderByAppCount}
      onChange={onChange}
      value={value}
      allowClear={allClear}
      showSearch
      placeholder={placeholder}
      onFirstLoad={onFirstLoad}
      style={{ width: '100%' }}
    />
  )
}

export default React.memo(DeviceChipSelector, () => false)
