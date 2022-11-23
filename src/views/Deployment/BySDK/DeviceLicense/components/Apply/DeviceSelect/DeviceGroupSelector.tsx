import React from 'react'
import RemoteSearch from '@src/components/RemoteSearch'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { useAtom } from 'jotai'
import { selectedDeviceGroupAtom } from '@views/Deployment/BySDK/DeviceLicense/components/Apply/store'

const DeviceGroupSelector: React.FC = () => {
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useAtom(selectedDeviceGroupAtom)

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter(x => x.value === 0)
    setSelectedDeviceGroup(defaultGroup || null)
  }, [])

  return (
    <RemoteSearch<DeviceGroupOptions>
      style={{ width: 180 }}
      value={selectedDeviceGroup || undefined}
      showSearch
      fetchOptions={deviceGroupAPI.fetchDeviceGroupByName}
      onChange={(o) => setSelectedDeviceGroup(o)}
      onFirstLoad={onFirstLoad}
    />
  )
}

export default DeviceGroupSelector
