import React from 'react'
import styled from 'styled-components'

import deviceAPI from '@src/apis/device'
import RemoteSearch from '@src/components/RemoteSearch'
import { useDeviceFilter } from './hook'

const Container = styled.div`
  width: 171px;
  overflow: hidden;
`

const DeviceFilter: React.FC = () => {
  const { value, handleChange } = useDeviceFilter()
  return (
    <Container>
      <RemoteSearch<Device.Chip.Option>
        fetchOptions={deviceAPI.fetchChipTypeByName}
        onChange={handleChange}
        value={value}
        allowClear
        showSearch
        placeholder='全部设备类型'
        style={{
          width: '100%',
        }}
      />
    </Container>
  )
}

export default DeviceFilter

