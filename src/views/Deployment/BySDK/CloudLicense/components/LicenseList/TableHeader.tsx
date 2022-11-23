import React from 'react'
import { Col, Row as AntRow } from 'antd'
import styled from 'styled-components'

const Row = styled(AntRow)`
  padding: 0 12px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #061926;
`

const TableHeader: React.FC = () => {
  return (
    <Row wrap={false} gutter={8}>
      <Col span={2}>
        序号
      </Col>
      <Col span={3}>
        创建时间
      </Col>
      <Col span={3}>
        到期日期
      </Col>
      <Col span={3}>
        授权实例数
      </Col>
      <Col span={3}>
        调用次数
      </Col>
      <Col span={3}>
        剩余次数
      </Col>
      <Col span={3}>
        授权状态
      </Col>
      <Col span={4}>
        操作
      </Col>
    </Row>
  )
}

export default TableHeader
