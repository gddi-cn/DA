import React from 'react'
import styled from 'styled-components'
import { Button, Popover } from 'antd'

import { ReactComponent as MoreIcon } from '../icons/more.svg'
import { ReactComponent as CopyIcon } from '../icons/copy.svg'
import { ReactComponent as DeleteIcon } from '../icons/delete.svg'

import { useMore } from './hook'

const Container = styled.div`
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

const Btn = styled(Button)<{
  gap?: React.CSSProperties['columnGap'],
  color?: React.CSSProperties['color']}
>`
  display: flex;
  align-items: center;
  column-gap: ${props => props.gap || '6px'};
  color: ${props => props.color || 'rgba(0, 0, 0, .85)'};
  &:hover, &:active, &:focus {
    color: ${props => props.color || 'rgba(0, 0, 0, .85)'};
  }
`

const ContentWrap = styled.div`
  background: #FDFEFE;
  box-shadow: 0px 0px 4px rgba(98, 176, 229, 0.3);
  border-radius: 4px;
  padding: 10px 5px;
`

const Content: React.FC = () => {
  const { handleCopy, handleDelete, loading } = useMore()
  return (
    <ContentWrap>
      <Btn
        icon={<CopyIcon />} type='text' gap='4px'
        onClick={handleCopy} disabled={loading}
      >
        复制
      </Btn>
      <Btn
        icon={<DeleteIcon />} type='text' gap='4px' color='#FF6177'
        onClick={handleDelete} disabled={loading}
      >
        删除
      </Btn>
    </ContentWrap>
  )
}

const More: React.FC = () => {
  return (
    <Container>
      <Popover
        trigger={['click']}
        placement='bottomRight'
        getPopupContainer={(el: HTMLElement) => (el as any).parentNode}
        content={<Content />}
      >
        <div>
          <Btn icon={<MoreIcon />} type={'text'} size={'large'}>
            更多
          </Btn>
        </div>
      </Popover>
    </Container>
  )
}

export default More

