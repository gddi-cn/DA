import React from 'react'
import styled from 'styled-components'
import { DownOutlined } from '@ant-design/icons'
import { lighten } from 'polished'
import { Popover } from 'antd'

import Content from './Content'

const Container = styled.div`
  height: 100%;
  width: 100%;
  .ant-popover-content {
    background-color: transparent;
  }
  .ant-popover-inner {
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
    &-content {
      padding: 0;
      background-color: transparent;
    }
  }
`

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const DropDownIcon = styled(DownOutlined)`
  color: #62B0E5;
  margin-right: 25px;
  cursor: pointer;
  &:hover {
    color: ${lighten(0.05, '#62B0E5')}
  }
`

const TaskSearcher: React.FC = () => {
  return (
    <Container>
      <Popover
        content={<Content />}
        trigger='click'
        destroyTooltipOnHide
        mouseEnterDelay={.4}
        title={null}
        getPopupContainer={(triggerNode: HTMLElement) => 
          triggerNode.parentElement ||
          document.body
        }
        placement='bottomLeft'
      >
        <IconContainer>
          <DropDownIcon />
        </IconContainer>
      </Popover>
    </Container>
  )
}

export default TaskSearcher

