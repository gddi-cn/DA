import React from 'react'
import styled from 'styled-components'
import { selectedAppAtom, selectedDeviceGroupAtom } from '../store'
import GroupSelector from '@src/components/GroupSelector'
import { useAtom, useAtomValue } from 'jotai'

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

const DeviceType = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #2582C1;
`

const DeviceGroup: React.FC = () => {
  const [value, setValue] = useAtom(selectedDeviceGroupAtom)
  const app = useAtomValue(selectedAppAtom)

  return (
    <Container>
      <Title>设备分组</Title>
      <Divider />
      <GroupSelector
        value={value}
        onChange={setValue}
        width='100%'
        selectDefault
        chipId={app?.device_chip_id}
      />
    </Container>
  )
}

export default DeviceGroup
