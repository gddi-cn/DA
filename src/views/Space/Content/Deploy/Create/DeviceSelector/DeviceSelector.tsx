import React from 'react'
import styled from 'styled-components'

import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import Scrollbar from '@src/components/Scrollbar'

import NameFilter from './NameFilter'
import DeviceGroupSelector from './DeviceGroupSelector'
import { useDeviceSelector } from './hook'
import { Checkbox, Pagination } from 'antd'
import Row from './Row'
import Nodata from './Nodata'
import DeviceTypeSelector from './DeviceTypeSelector'
import SortSelector from '@src/views/Space/components/SortSelector'

const gridTemplate = '1fr 6fr 6fr 4fr 6fr 4fr'

const Container = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  padding: 40px 40px 20px;
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

const Filter = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  row-gap: 10px;
  flex-wrap: wrap;
`

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`

const ScrollWrap = styled.div`
  padding: 0 40px;
`

const PaginationWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 40px 0;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
`

const ListHeader = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 4px;
  margin: 0 40px;
`

const HeaderCell = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const RowWrap = styled.div`
  > div:not(:last-of-type) {
    border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  }
`

const SubTitle = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin: 20px 0 6px;
  &::before {
    display: inline-block;
    content: '*';
    color: #FF4D4F;
    margin-right: 4px;
  }
`

const DeviceSelector: React.FC = () => {
  const {
    disabledNext,
    handleCancel,
    handleNext,
    handleChange,
    total,
    page,
    pageSize,
    deviceList,
    selectedAll,
    indeterminate,
    handleSelectAll,
    selectedCount,
    disabledSelect,
    sort,
    sortBy,
    handleSortChange,
  } = useDeviceSelector()

  return (
    <Container>
      <Header>
        <Title>选择设备</Title>
        <SelectedApp>
          已选设备：{selectedCount}
        </SelectedApp>
        <SubTitle>
          设备类型
        </SubTitle>
        <DeviceTypeSelector />
        <SubTitle>
          设备列表
        </SubTitle>
        <Filter>
          <NameFilter />
          <DeviceGroupSelector />
          <SortSelector sort={sort} sortBy={sortBy} onChange={handleSortChange} />
        </Filter>
      </Header>
      {
        deviceList.length ? (
          <>
            <ListHeader>
              <HeaderCell>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={indeterminate && !selectedAll}
                  onClick={handleSelectAll}
                  disabled={disabledSelect}
                />
              </HeaderCell>
              <HeaderCell>设备名称</HeaderCell>
              <HeaderCell>设备 SN</HeaderCell>
              <HeaderCell>AI 芯片类型</HeaderCell>
              <HeaderCell>注册时间</HeaderCell>
              <HeaderCell>设备状态</HeaderCell>
            </ListHeader>
            <Content>
              <Scrollbar autoHide>
                <ScrollWrap>
                  <RowWrap>
                    {
                      deviceList.map(device => <Row key={device.id} {...device} />)
                    }
                  </RowWrap>
                </ScrollWrap>
              </Scrollbar>
            </Content>
            <PaginationWrap>
              <Pagination
                current={page}
                pageSize={pageSize}
                onChange={handleChange}
                total={total}
                showTotal={(t) => `共 ${t} 条记录`}
                size={'small'}
              />
            </PaginationWrap>
          </>
        ) : (
          <Content>
            <Nodata />
          </Content>
        )
      }
      <Footer>
        <SecondaryBtn width={97} onClick={handleCancel}>取消</SecondaryBtn>
        <PrimaryBtn width={97} onClick={handleNext} disabled={disabledNext}>下一步</PrimaryBtn>
      </Footer>
    </Container>
  )
}

export default DeviceSelector
