import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

import { GroupDevice } from '@src/shared/types/device'
import {
  groupDeviceStateColorMapping,
  groupDeviceStateNameMapping,
} from '@src/shared/mapping/device'
import { formatUnixTime } from '@src/utils/tools'

import { useDeviceItem } from './hook'
import { darken, lighten } from 'polished'


const gridTemplate = '6fr 6fr 4fr 6fr 4fr 1fr'

const Container = styled.div`
  padding: 10px 12px;
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 4px;
  .remove_app_btn {
    display: none;
  }
  &:hover {
    background-color: rgba(0, 0, 0, .02);
    .remove_app_btn {
      display: block;
    }
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

const Btn = styled.p`
  color: #ff6177;
  cursor: pointer;
  &:hover {
    color: ${lighten(.05, '#ff6177')};
  }
  &:active {
    color: ${darken(.05, '#ff6177')}
  }
`

const Row: React.FC<GroupDevice> = (device) => {
  const {
    name,
    sn,
    chip,
    create_time,
    state,
  } = device

  const { handleRemove } = useDeviceItem(device)

  return (
    <Container>
      <RowCell>{name}</RowCell>
      <RowCell>{sn}</RowCell>
      <RowCell>{chip}</RowCell>
      <RowCell>{create_time ? formatUnixTime(create_time) : '--'}</RowCell>
      <RowCell color={state ? groupDeviceStateColorMapping.get(state) : '#ccc'}>
        {state ? groupDeviceStateNameMapping.get(state) : '未知'}
      </RowCell>
      <RowCell>
        <Btn onClick={handleRemove} className="remove_app_btn">移除</Btn>
      </RowCell>
    </Container>
  )
}

export default Row

