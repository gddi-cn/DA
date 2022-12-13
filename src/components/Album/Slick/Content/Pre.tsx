import React from 'react'
import { StepBackwardOutlined as PrePageIcon, LeftOutlined as PreIcon } from '@ant-design/icons'
import styled from 'styled-components'
import { Button } from 'antd'

import { usePre } from './hook'

const Container = styled.div`
  position: absolute;
  left: 0;
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

const Pre: React.FC = () => {
  const { handlePrePage, handlePre, showPage, disabledPrePage } = usePre()

  return (
    <Container className={'__album_content_controls'}>
      {
        showPage ? (
          <Button type={'link'} title={'上一张'} onClick={handlePrePage} disabled={disabledPrePage}>
            <PrePageIcon />
          </Button>
        ) : (
          <Button type={'link'} title={'上一张'} onClick={handlePre}>
            <PreIcon />
          </Button>
        )
      }
    </Container>
  )
}

export default Pre
