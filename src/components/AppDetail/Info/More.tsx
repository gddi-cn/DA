import React from 'react'
import styled from 'styled-components'
import { Button, Popover as AntPopover } from 'antd'

import { ReactComponent as MoreIcon } from '../icons/more.svg'

const Container = styled.div`

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

const More: React.FC = () => {
  return (
    <Container>
      <Popover
        trigger={['click']}
        placement='bottomRight'
        getPopupContainer={(el: HTMLElement) => (el as any).parentNode}
        content={(
          <>
            123456
          </>
        )}
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

