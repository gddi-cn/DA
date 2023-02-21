import React from 'react'
import styled from 'styled-components'

import { SecondaryBtn } from '@src/components/Button'
import Scrollbar from '@src/components/Scrollbar'
import DeviceList from './DeviceList'

import { ReactComponent as FilterAllIcon } from '@src/asset/icons/space/filter_all.svg'
import { ReactComponent as FilterSuccessIcon } from '@src/asset/icons/space/filter_success.svg'
import { ReactComponent as FilterPendingIcon } from '@src/asset/icons/space/filter_pending.svg'
import { ReactComponent as FilterFailIcon } from '@src/asset/icons/space/filter_fail.svg'

import { useDetail } from './hook'

const bgMapping = {
  Done: '#eaf5ee',
  InProgress: '#eff8ff',
  Failure: '#fdf1f2',
}

const colorMapping = {
  Done: '#19A051',
  InProgress: '#2582C1',
  Failure: '#FF6177',
}

const labelMapping = {
  All: '全部设备',
  Done: '部署成功',
  InProgress: '部署中',
  Failure: '部署失败',
}

const Container = styled.div`
  height: 100%;
  over-flow: hidden;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Created = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8C8C8C;
`

const FilterWrap = styled.div`
  display: flex;
  column-gap: 20px;
  padding: 0 40px;
`

const FilterItem = styled.div<{ bg?: React.CSSProperties['backgroundColor'], oc?: React.CSSProperties['outlineColor'] }>`
  border-radius: 4px;
  background-color: ${props => props.bg || 'unset'};
  width: 147px;
  padding: 10px;
  display: flex;
  column-gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: box-shadow ease-in .1s;
  &:hover:not([selected]) {
    box-shadow: 1px 2px 4px rgba(177, 191, 202, 0.36);
  }
  &[selected] {
    outline: 2px solid ${props => props.oc || '#48A2DF'};
  }
`

const FilterConent = styled.div<{ color?: React.CSSProperties['color']}>`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  p {
    &:first-of-type {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #061926;
    }
    &:last-of-type {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: ${props => props.color || 'rgba(0, 0, 0, .85)'};
    }

  }
`

const SubTitle = styled.p<{ mt?: React.CSSProperties['marginTop']}>`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin-top: 40px;
  padding: 0 40px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 40px 0;
`

const ScrollWrap = styled.div`
  height: 100%;
  over-flow: hidden;
  margin-top: 20px;
  flex: 1;
`

const Content = styled.div`
  padding: 0 40px;
  height: 100%;
`

const Detail: React.FC = () => {
  const {
    created, total, pending_count,
    success_count, failed_count,
    allRef, successRef, pendingRef, failRef,
    handleClick, deviceList, handleClose,
  } = useDetail()

  return (
    <Container>
      <Header>
        <Title>设备概览</Title>
        <Created>{created}</Created>
      </Header>
      <FilterWrap>
        <FilterItem
          ref={allRef}
          bg={bgMapping['InProgress']}
          onClick={() => handleClick('All')}
        >
          <FilterAllIcon />
          <FilterConent color={colorMapping['InProgress']}>
            <p>{labelMapping['All']}</p>
            <p>{total || 0}</p>
          </FilterConent>
        </FilterItem>
        <FilterItem
          ref={successRef}
          bg={bgMapping['Done']}
          onClick={() => handleClick('Done')}
          oc={colorMapping['Done']}
        >
          <FilterSuccessIcon />
          <FilterConent
            color={colorMapping['Done']}
            onClick={() => handleClick('Done')}
          >
            <p>{labelMapping['Done']}</p>
            <p>{success_count || 0}</p>
          </FilterConent>
        </FilterItem>
        <FilterItem
          ref={pendingRef}
          bg={bgMapping['InProgress']}
          onClick={() => handleClick('InProgress')}
        >
          <FilterPendingIcon />
          <FilterConent color={colorMapping['InProgress']}>
            <p>{labelMapping['InProgress']}</p>
            <p>{pending_count || 0}</p>
          </FilterConent>
        </FilterItem>
        <FilterItem
          ref={failRef}
          bg={bgMapping['Failure']}
          onClick={() => handleClick('Failure')}
          oc={colorMapping['Failure']}
        >
          <FilterFailIcon />
          <FilterConent color={colorMapping['Failure']}>
            <p>{labelMapping['Failure']}</p>
            <p>{failed_count || 0}</p>
          </FilterConent>
        </FilterItem>
      </FilterWrap>
      <SubTitle mt={'40px'}>
        设备下发详情
      </SubTitle>
      <ScrollWrap>
        <Scrollbar autoHide>
          <Content>
            <DeviceList deviceList={deviceList} />
          </Content>
        </Scrollbar>
      </ScrollWrap>
      <Footer>
        <SecondaryBtn width={97} onClick={handleClose}>返回列表</SecondaryBtn>
      </Footer>
    </Container>
  )
}

export default Detail
