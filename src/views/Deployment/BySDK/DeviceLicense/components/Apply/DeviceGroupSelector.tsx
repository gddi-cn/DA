import React from 'react'
import RemoteSearch from '@src/components/RemoteSearch'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { useAtom } from 'jotai'
import { selectedDeviceGroupAtom } from '@views/Deployment/BySDK/DeviceLicense/components/Apply/store'

const defaultGroupOption = { key: 0, value: 0, label: '默认组' }

const DeviceGroupSelector: React.FC = () => {
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useAtom(selectedDeviceGroupAtom)

  return (
    <RemoteSearch<DeviceGroupOptions>
      style={{ width: 180 }}
      value={selectedDeviceGroup || undefined}
      showSearch
      fetchOptions={deviceGroupAPI.fetchDeviceGroupByName}
      onChange={(o) => setSelectedDeviceGroup(o)}
      onFirstLoad={(o) => {
        const [defaultGroup] = o.filter(x => x.value === 0)
        setSelectedDeviceGroup(defaultGroup || null)
      }}
    />
  )
}

export default DeviceGroupSelector
