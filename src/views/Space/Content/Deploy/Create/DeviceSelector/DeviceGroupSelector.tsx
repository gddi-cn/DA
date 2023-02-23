import React from 'react'

import { useDeviceGroupSelector } from './hook'
import RemoteSearch from '@src/components/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'


const DeviceGroupSelector: React.FC = () => {
  const { selectedDeviceGroup, onFirstLoad, handleChange } = useDeviceGroupSelector()

  return (
    <RemoteSearch<DeviceGroupOptions>
      style={{ width: 171, borderRadius: 4 }}
      value={selectedDeviceGroup || undefined}
      showSearch
      fetchOptions={deviceGroupAPI.fetchEdgeDeviceGroupByNameWithNoExtend}
      onChange={handleChange}
      onFirstLoad={onFirstLoad}
      placeholder='设备分组'
      allowClear
    />
  )
}

export default DeviceGroupSelector
