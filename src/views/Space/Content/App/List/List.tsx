import React from 'react'
import styled from 'styled-components'
import CustomScrollbar, { ScrollbarProps as CustomScrollbarProps } from 'react-custom-scrollbars'

export interface ScrollbarProps extends Partial<CustomScrollbarProps> {

}

import { useAppList } from './hook'

import NameFilter from './NameFilter'
import TemplateLabelFilter from './TemplateLabelFilter'
import InputFilter from './InputFilter'
import DeviceFilter from './DeviceFilter'
import CreateBtn from './CreateBtn'
import AppItem from './AppItem'
import { Spin } from 'antd'

const Bar: any = CustomScrollbar

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
  padding: 40px 0 0;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  row-gap: 10px;
  flex-wrap: wrap;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const ScrollWrap = styled.div`
  padding-top: 20px;
  flex: 1;
  padding-bottom: 40px;
  position: relative;
`

const Content = styled.div`
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 20px;
`

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, .5)
`

const ScrollContainer = styled.div`
  height: 100%;
  width: 100%;
`

const List: React.FC = () => {
  const { appList, loading, scrollbarRef, handleScroll, } = useAppList()

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <NameFilter />
          <TemplateLabelFilter />
          <InputFilter />
          <DeviceFilter />
        </HeaderLeft>
        <HeaderRight>
          <CreateBtn />
        </HeaderRight>
      </Header>
      <ScrollWrap>
        {
          loading ? (
            <LoadingWrap>
              <Spin spinning />
            </LoadingWrap>
          ) : null
        }
        <ScrollContainer>
          <Bar ref={scrollbarRef} onScrollFrame={handleScroll} autoHide>
            <Content>
              {
                appList.map(app => (
                  <AppItem {...app} key={app.id} />
                ))
              }
            </Content>
          </Bar>
        </ScrollContainer>
      </ScrollWrap>
    </Container>
  )
}

export default List

