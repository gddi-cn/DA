import React from 'react'
import styled from 'styled-components'

import {
  groupDeviceStateColorMapping,
  groupDeviceStateNameMapping
} from '@src/shared/mapping/device'
import Scrollbar from '@src/components/Scrollbar'

import { ReactComponent as DeploySuccessIcon } from '@src/asset/icons/space/deploy_success.svg'
import { ReactComponent as DeployPendingIcon } from '@src/asset/icons/space/deploy_pending.svg'
import { ReactComponent as DeployFailIcon } from '@src/asset/icons/space/deploy_fail.svg'
import { useSetAtom } from 'jotai'
import { currentAppIdAtom, currentPageAtom } from './store'

const useSyncItem = (sync: Device.Sync) => {
  const { app_name, sync_state, app_id, deleted } = sync || {}
  const setCurrentAppId = useSetAtom(currentAppIdAtom)
  const setCurrentPage = useSetAtom(currentPageAtom)

  const Icon = React.useMemo(() => {
    switch(sync_state) {
      case 'Done':
        return DeploySuccessIcon
      case 'InProgress':
        return DeployPendingIcon
      default:
        return DeployFailIcon
    }
  }, [sync_state])

  const handleClick = () => {
    setCurrentAppId(app_id)
    setTimeout(() => {
      setCurrentPage('app')
    });
  }

  return {
    Icon,
    name: app_name || '--',
    handleClick,
    disabled: deleted,
  }
}



const Container = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #EDF8FF;
  border-radius: 4px;
  padding: 10px 0;
  height: 180px;
  &:not(:hover) {
    filter: drop-shadow(0 0 4px rgba(25, 82, 193, 0.25));
  }
  &:hover:not([selected]) {
    filter: drop-shadow(0 0 8px rgba(25, 82, 193, 0.25));
  }
`

const Title = styled.div`
  padding: 0 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const Status = styled.div<{ color?: React.CSSProperties['color'] }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-top: 4px;
  padding: 0 10px;
  color: ${props => props.color || '#606266'};
`

const Divider = styled.hr`
  margin: 10px 10px 5px;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5)
`

const ScrollWrap = styled.div`
  flex: 1;
  overflow: hidden;
`

const Content = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`

const SyncItemWrap = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 6px;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  &:hover {
    background-color: ${props => props.disabled ? '#fafafa' : 'rgba(255, 255, 255, 1)'};
  }
  &:active {
    background-color: ${props => props.disabled ? '#fafafa' : 'rgba(255, 255, 255, .8)'};
  }
  > p {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #061926;
  }
`

const SyncItem: React.FC<Device.Sync> = (sync) => {
  const { Icon, name, handleClick, disabled } = useSyncItem(sync)

  return (
    <SyncItemWrap onClick={handleClick} disabled={disabled}>
      <Icon />
      <p>{name}</p>
    </SyncItemWrap>
  )
}

const DeviceItem: React.FC<Device.SyncInstance> = (
  {
    name,
    state,
    syncs,
  }
) => {
  return (
    <Container>
      <Title>
        {name}
      </Title>
      <Status color={groupDeviceStateColorMapping.get(state)}>
        {groupDeviceStateNameMapping.get(state)}
      </Status>
      <Divider />
      <ScrollWrap>
        <Scrollbar>
          <Content>
            {
              (syncs || []).map((sync, idx) => (
                <SyncItem key={name + '_' + idx} {...sync} />
              ))
            }
          </Content>
        </Scrollbar>
      </ScrollWrap>
    </Container>
  )
}

export default DeviceItem

