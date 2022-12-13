import React from 'react'
import { StepForwardOutlined as NextPageIcon, RightOutlined as NextIcon } from '@ant-design/icons'
import styled from 'styled-components'
import { Button } from 'antd'

import { useNext } from './hook'

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-btn {
    height: unset;
    font-size: 22px;
  }
`

const Next: React.FC = () => {
  const { handleNextPage, handleNext, disabledNextPage, showPage } = useNext()

  return (
    <Container className={'__album_content_controls'}>
      {
        showPage ? (
          <Button type={'link'} title={'下一页'} onClick={handleNextPage} disabled={disabledNextPage}>
            <NextPageIcon />
          </Button>
        ) : (
          <Button type={'link'} title={'下一张'} onClick={handleNext}>
            <NextIcon />
          </Button>
        )
      }
    </Container>
  )
}

export default Next
