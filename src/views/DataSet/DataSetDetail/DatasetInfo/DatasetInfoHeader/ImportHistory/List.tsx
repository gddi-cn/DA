import React from 'react'
import styled from 'styled-components'
import { Col, Row as AntRow, Tooltip, Typography } from 'antd'

import { formatSize, formatUnixTime } from '@src/utils/tools'
import { Dataset } from '@src/shared/types/dataset'
import { useList } from './hook'
import Nodata from './Nodata'
import { datasetImportStatusNameMapping } from '@src/shared/mapping/dataset'

const Divider = styled.hr`
  margin: 0;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5)
`

const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 400px;
`

const Table = styled.div`
  width: 100%;
  //width: 568px;
  //max-width: 100%;
`

const Row = styled(AntRow)`
  padding: 14px 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  .ant-typography {
    color: #606266;
  }
`

const HeaderRow = styled(AntRow)`
  padding: 0 12px;
  margin-bottom: 12px;
  font-weight: 500;
  color: #061926;
  font-size: 14px;
  line-height: 22px;
`

const spans = [8, 4, 8, 4]

const TableHeader: React.FC = () => {
  return (
    <HeaderRow wrap={false} gutter={8}>
      <Col span={spans[0]}>
        文件名
      </Col>
      <Col span={spans[1]}>
        文件大小
      </Col>
      <Col span={spans[2]}>
        更新时间
      </Col>
      <Col span={spans[3]}>
        校验状态
      </Col>
    </HeaderRow>
  )
}

const TableRow: React.FC<Dataset.Import.History.Instance> = (
  {
    filename,
    size,
    created,
    status,
  }
) => {
  return (
    <>
      <Divider />
      <Row align={'middle'} gutter={8} wrap={false}>
        <Col span={spans[0]}>
          <Tooltip title={filename || '-'}>
            <Typography.Text ellipsis>
              {filename || '-'}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={spans[1]}>
          <Tooltip title={formatSize(size) || '-'}>
            <Typography.Text ellipsis>
              {formatSize(size) || '-'}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={spans[2]}>
          <Tooltip title={created ? formatUnixTime(created) : '-'}>
            <Typography.Text ellipsis>
              {created ? formatUnixTime(created) : '-'}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={spans[3]}>
          <Tooltip title={datasetImportStatusNameMapping.get(status) || '-'}>
            <Typography.Text ellipsis>
              {datasetImportStatusNameMapping.get(status)}
            </Typography.Text>
          </Tooltip>
        </Col>
      </Row>
    </>
  )
}

const List: React.FC<{ id: Dataset['id']}> = (
  {
    id,
  }
) => {
  const { dataList, empty } = useList(id)

  return empty ? (
    <Nodata />
  ) : (
    <Container>
      <Table>
        <TableHeader />
        {
          dataList.map((data, idx) => (
            <TableRow key={idx} {...data} />
          ))
        }
      </Table>
    </Container>
  )
}

export default List

