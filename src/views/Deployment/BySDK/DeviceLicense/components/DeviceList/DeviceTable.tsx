import React from 'react'
import { Col, Row as AntRow, Tooltip, Typography } from 'antd'
import styled from 'styled-components'
import Divider from '../LicenseList/Divider'
import { LicensedDevice } from '@src/shared/types/device'
import { formatUnixTime } from '@src/utils/tools'
import { useAtom } from 'jotai'
import { devicesAtom } from './store'

const Container = styled.div`
  margin-top: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Table = styled.div`
  width: 568px;
  max-width: 100%;
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

const TableHeader: React.FC = () => {
  return (
    <HeaderRow wrap={false} gutter={8}>
      <Col span={4}>
        设备名称
      </Col>
      <Col span={7}>
        设备 SN
      </Col>
      <Col span={7}>
        AI 芯片型号
      </Col>
      <Col span={6}>
        注册时间
      </Col>
    </HeaderRow>
  )
}

const TableRow: React.FC<LicensedDevice> = (
  {
    name,
    sn,
    type,
    created,
  }
) => {
  return (
    <>
      <Divider />
      <Row align={'middle'} gutter={8} wrap={false}>
        <Col span={4}>
          <Tooltip title={name || '-'}>
            <Typography.Text ellipsis>
              {name || '-'}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={7}>
          <Tooltip title={sn || '-'}>
            <Typography.Text ellipsis>
              {sn || '-'}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={7}>
          <Tooltip title={type|| '-'}>
            <Typography.Text ellipsis>
              {type || '-'}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title={created ? formatUnixTime(created) : '-'}>
            <Typography.Text ellipsis>
              {created ? formatUnixTime(created) : '-'}
            </Typography.Text>
          </Tooltip>
        </Col>
      </Row>
    </>
  )
}

const TableBody: React.FC = () => {
  const [deviceList] = useAtom(devicesAtom)

  return (
    <>
      {
        deviceList.map((device, idx) => (
          <TableRow key={idx} {...device} />
        ))
      }
    </>
  )
}

const DeviceTable: React.FC = () => {
  return (
    <Container>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </Container>
  )
}

export default DeviceTable
