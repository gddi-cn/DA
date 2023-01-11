import React from 'react'
import styled from 'styled-components'

import { useDeviceGroupSelector } from './hook'
import RemoteSearch from '@src/components/RemoteSearch/RemoteSearch'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceGroupAPI from '@src/apis/deviceGroups'

const Container = styled.div`
  background: #EDF8FF;
  border-radius: 8px;
  padding: 20px 15px;
  overflow: hidden;
`

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const Divider = styled.hr`
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5);
  margin: 10px 0;
`

const DeviceGroupSelector: React.FC = () => {
  const { show, selectedDeviceGroup, onFirstLoad, handleChange } = useDeviceGroupSelector()

  return show ? (
    <Container>
      <Title>设备分组</Title>
      <Divider />
      <RemoteSearch<DeviceGroupOptions>
        style={{ width: 180 }}
        value={selectedDeviceGroup || undefined}
        showSearch
        fetchOptions={deviceGroupAPI.fetchDeviceGroupByName}
        onChange={handleChange}
        onFirstLoad={onFirstLoad}
      />
    </Container>
  ) : null
}

export default DeviceGroupSelector
