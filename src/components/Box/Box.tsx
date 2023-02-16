
import React from 'react'
import styled from 'styled-components'

import Scrollbar from '@src/components/Scrollbar'

interface BoxProps {
  header?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  noScroll?: boolean
}

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const Header = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px
`

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 40px;
  right: 40px;
`

const ScrollWrap = styled.div`
  padding: 82px 0 72px;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Content = styled.div`
  padding: 0 140px;
`

const Detail: React.FC<BoxProps> = (
  {
    children,
    header,
    footer,
    noScroll = false,
  }
) => {

  return (
    <Container>
      <ScrollWrap>
        {
          noScroll ? children : (
            <Scrollbar autoHide>
              <Content>
                { children }
              </Content>
            </Scrollbar>
          )
        }
      </ScrollWrap>
      <Header>{header}</Header>
      <Footer>
        { footer }
      </Footer>
    </Container>
  )
}

export default Detail

