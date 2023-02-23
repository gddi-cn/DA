import React from 'react'
import styled from 'styled-components'

import { GroupDevice } from '@src/shared/types/device'
import {
  groupDeviceStateColorMapping,
  groupDeviceStateNameMapping,
} from '@src/shared/mapping/device'
import { Checkbox } from 'antd'
import { formatUnixTime } from '@src/utils/tools'

import { useRow } from './hook'


const gridTemplate = '1fr 6fr 6fr 4fr 6fr 4fr'

const Container = styled.div<{ disabled?: boolean }>`
  padding: 10px 12px;
  display: grid;
  grid-template-columns: ${gridTemplate};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  column-gap: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, .02);
  };
`

const RowCell = styled.div<{ color?: React.CSSProperties['color'] }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.color || '#606266'};
`

const Row: React.FC<GroupDevice> = (device) => {
  const {
    name,
    sn,
    chip,
    create_time,
    state,
  } = device

  const { selected, handleSelect, disabledSelect } = useRow(device)

  return (
    <Container onClick={handleSelect} disabled={disabledSelect}>
      <RowCell>
        <Checkbox
          onClick={e => e.preventDefault()}
          checked={selected}
          disabled={disabledSelect}
        />
      </RowCell>
      <RowCell>{name}</RowCell>
      <RowCell>{sn}</RowCell>
      <RowCell>{chip}</RowCell>
      <RowCell>{create_time ? formatUnixTime(create_time) : '--'}</RowCell>
      <RowCell color={state ? groupDeviceStateColorMapping.get(state) : '#ccc'}>
        {state ? groupDeviceStateNameMapping.get(state) : '未知'}
      </RowCell>
    </Container>
  )
}

export default Row

