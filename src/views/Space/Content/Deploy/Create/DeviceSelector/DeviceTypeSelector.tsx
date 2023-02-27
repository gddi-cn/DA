import React from 'react'
import styled from 'styled-components'

import RemoteSearch from '@src/components/RemoteSearch'
import deviceAPI from '@src/apis/device'
import { useSelectDeviceType } from './hook'

const Container = styled.div`
  width: 400px;
`

const DeviceTypeSelector: React.FC = () => {
  const { value, handleChange  } = useSelectDeviceType()

  return (
    <Container>
      <RemoteSearch<Device.Chip.Option>
        value={value}
        onChange={handleChange}
        fetchOptions={deviceAPI.fetchChipTypeDetailByName}
        allowClear
        showSearch
        placeholder='选择设备类型'
        style={{
          width: '100%',
        }}
      />
    </Container>
  )
}

export default DeviceTypeSelector

