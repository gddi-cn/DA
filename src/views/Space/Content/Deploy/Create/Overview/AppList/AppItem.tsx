import React from 'react'
import styled from 'styled-components'

import { useAppItem } from './hook'
import { ReactComponent as DeviceI } from '@src/asset/icons/space/device.svg'
import { ReactComponent as RemoveAppIcon } from '@src/asset/icons/space/remove_app.svg'
import { darken } from 'polished'

const DeviceIcon = styled(DeviceI)`
  line, rect {
    stroke: #2582C1;
  } 
`

const Container = styled.div`
  width: 100%;
  background-color: #EDF8FF;
  border-radius: 4px;
  transition: box-shadow ease-in .2s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  &:hover {
    box-shadow: 1px 4px 6px rgba(177, 191, 202, 0.36);
  }
`

const Cover = styled.img`
  display: block;
  object-fit: cover;
  overflow: hidden;
  height: 140px;
`

const Content = styled.div`
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const Title = styled.h6`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #2582C1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TagList = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`

const Tag = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;
`

const TagTip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #2582C1;
`

const Device = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  column-gap: 2px;
  overflow: hidden;
`

const DeviceTip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #2582C1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TemplateName = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  background: #2582C1;
  border-radius: 22px;
  padding: 0 10px;
  display: inline-block;
`

const CheckWrap = styled.div`
  line-height: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:hover {
    circle {
      fill: ${darken(.05, '#ffffff')};
    }
    line {
      stroke: ${darken(.05, '#62B0E5')}
    }
  }
  &:active {
    circle {
      fill: ${darken(.1, '#ffffff')};
    }
    line {
      stroke: ${darken(.1, '#62B0E5')}
    }
  }
`

const AppItem: React.FC<App.Instance> = (app) => {
  const {
    cover,
    name,
    adapter_device,
    template_name,
    InputIcon,
    inputTip,
    handleRemove,
  } = useAppItem(app)

  return (
    <Container>
      <Cover src={cover} alt={'cover'} />
      <Content>
        <Title title={name}>{name}</Title>
        <TagList>
          <Tag>
            <InputIcon />
            <TagTip>{inputTip}</TagTip>
          </Tag> 
          <Device>
            <DeviceIcon />
            <DeviceTip title={adapter_device}>{adapter_device}</DeviceTip>
          </Device> 
        </TagList>
        <div>
          <TemplateName>{template_name}</TemplateName>
        </div>
      </Content>
      <CheckWrap title='移除' onClick={handleRemove}>
        <RemoveAppIcon />
      </CheckWrap>
    </Container>
  )
}

export default AppItem
