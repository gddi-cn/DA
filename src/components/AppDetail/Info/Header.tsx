import React from 'react'
import styled from 'styled-components'

import { useHeader } from './hook'
import { Button, Popover as AntPopover } from 'antd'
import { ReactComponent as EditIcon } from '../icons/edit.svg'
import { ReactComponent as MoreIcon } from '../icons/more.svg'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 36px;
  color: #061926;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Toolbars = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  column-gap: 6px;
`

const Popover = styled(AntPopover)`
  padding: 0;
  .ant-popover-inner {
    border-radius: 8px;
  }
`

const Header: React.FC = () => {
  const { name } = useHeader()
  return (
    <Container>
      <Title title={name}>{name}</Title>
      <Toolbars>
        <Btn icon={<EditIcon />} type={'text'} size={'large'}>
          重命名
        </Btn>
        <Popover
          trigger={['click']}
          placement='bottomRight'
          content={(
            <>
              123
            </>
          )}
        >
          <div>
            <Btn icon={<MoreIcon />} type={'text'} size={'large'}>
              更多
            </Btn>
          </div>
        </Popover>
      </Toolbars>
    </Container>
  )
}

export default Header

