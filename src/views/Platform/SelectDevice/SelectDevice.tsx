import React from 'react'
import { Table as AntTable } from 'antd'
import styled from 'styled-components'

import { useSelectDevice } from './hook'
import columns from './columns'

const Container = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: 100%;
`

const Table = styled(AntTable)`
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;

    .ant-spin-container {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      .ant-table {
        flex: auto;
        overflow: hidden;

        .ant-table-container {
          height: 100%;
          display: flex;
          flex-flow: column nowrap;

          .ant-table-header {
            flex: none;
          }

          .ant-table-body {
            flex: auto;
            overflow: scroll;
          }
        }
      }

      .ant-table-pagination {
        flex: none;
      }
    }
  }
`

const SelectDevice: React.FC = () => {
  const { loading, deviceList, page, pageSize, handlePaginationChange, total, handleSelectedChange } = useSelectDevice()

  return (
    <Container>
      <Table
        rowKey={'id'}
        loading={loading}
        dataSource={deviceList}
        columns={columns as any}
        rowSelection={{
          onChange: handleSelectedChange as any,
          columnWidth: 0.5,
          getCheckboxProps(value) {
            return {
              disabled: !(value as any).match,
            }
          }
        }}
        pagination={{
          current: page,
          pageSize,
          onChange: handlePaginationChange,
          showQuickJumper: true,
          total,
          size: 'small',
          showSizeChanger: true,
          showPrevNextJumpers: true,
          showTotal: (t) => `共 ${t} 条记录`,
          style: {
            padding: '0 8px',
          }
        }}
      />
    </Container>
  )
}

export default SelectDevice