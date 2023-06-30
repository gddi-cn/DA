import React from 'react'
import RemoteSearch from '@src/components/RemoteSearch'
import deviceAPI from '@src/apis/device'

export interface DeviceChipSelectorProps {
  defaultDeviceId?: Device.Chip.Instance['key']
  onChange?: (newValue?: Device.Chip.Option) => void
  value?: Device.Chip.Option
  modelIterId?: string,
  allClear?: boolean
  placeholder?: string
  defaultMostApp?: boolean
}

const DeviceChipSelector: React.FC<DeviceChipSelectorProps> = (
  {
    defaultDeviceId,
    value,
    onChange,
    modelIterId,
    allClear = false,
    placeholder = '全部设备类型',
    defaultMostApp = false
  }
) => {
  const onFirstLoad = React.useCallback(
    (o: Array<Device.Chip.Option>) => {
      if (defaultDeviceId) {
        const find = o.find(({ key }) => key === defaultDeviceId)
        console.log({ find })
        if (find) {
          onChange && onChange(find)
        }
        return
      }
      if (value) return
      if (!defaultMostApp) return
      if (!o.length) return
      onChange && onChange(o[0])
    },
    [defaultMostApp, onChange, value, defaultDeviceId]
  )

  return (
    <RemoteSearch<Device.Chip.Option>
      fetchOptions={(name) => deviceAPI.fetchChipTypeByNameOrderByAppCount(name, modelIterId)}
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
