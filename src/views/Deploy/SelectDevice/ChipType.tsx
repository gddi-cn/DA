import { useAtomValue } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { selectedAppAtom } from '../store'

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

const ChipType: React.FC = () => {
  const selectedApp = useAtomValue(selectedAppAtom)

  return (
    <Container>
      <Title>芯片类型</Title>
      <Divider />
      <DeviceType>{selectedApp?.adapter_device || '-'}</DeviceType>
    </Container>
  )
}

export default ChipType
