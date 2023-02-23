import React from 'react'
import styled from 'styled-components'
import CustomScrollbar, { ScrollbarProps as CustomScrollbarProps } from 'react-custom-scrollbars'

export interface ScrollbarProps extends Partial<CustomScrollbarProps> {

}

import { useAppList } from './hook'

import Nodata from './Nodata'
import NameFilter from './NameFilter'
import TemplateLabelFilter from './TemplateLabelFilter'
import InputFilter from './InputFilter'
import AppItem from './AppItem'
import { Spin } from 'antd'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

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
  padding: 0 40px;
`

const Filter = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  row-gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
`

const ScrollWrap = styled.div`
  padding-top: 20px;
  flex: 1;
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

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const SelectedApp = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #62B0E5;
  margin-top: 8px;
`

const Footer = styled.div`
  display: flex;
  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const List: React.FC = () => {
  const {
    appList, loading, scrollbarRef,
    handleScroll, handleCancel, selectedNum,
    handlePre, handleNext, disabledNext,
  } = useAppList()

  return (
    <Container>
      <Header>
        <Title>选择应用</Title>
        <SelectedApp>
          已选应用：{selectedNum}
        </SelectedApp>
        <Filter>
          <NameFilter />
          <TemplateLabelFilter />
          <InputFilter />
        </Filter>
      </Header>
      <ScrollWrap>
        {
          loading ? (
            <LoadingWrap>
              <Spin spinning />
            </LoadingWrap>
          ) : null
        }
        {
          appList.length ? (
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
          ) : <Nodata />
        }
      </ScrollWrap>
      <Footer>
        <SecondaryBtn width={97} onClick={handleCancel}>取消</SecondaryBtn>
        <FooterRight>
          <SecondaryBtn width={97} onClick={handlePre}>上一步</SecondaryBtn>
          <PrimaryBtn width={97} onClick={handleNext} disabled={disabledNext}>下一步</PrimaryBtn>
        </FooterRight>
      </Footer>
    </Container>
  )
}

export default List

