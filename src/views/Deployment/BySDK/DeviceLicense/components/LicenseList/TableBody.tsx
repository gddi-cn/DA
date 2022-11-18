import React from 'react'
import { useAtom } from 'jotai'
import { deviceLicenseListAtom } from '@views/Deployment/BySDK/DeviceLicense/store'
import { License } from '@src/shared/types/license'
import { Col, Row as AntRow, Tooltip, Typography } from 'antd'
import { formatUnixTime } from '@src/utils/tools'
import LicenseStatusTag from '@src/components/LicenseStatusTag'
import styled from 'styled-components'
import Divider from './Divider'
import DeviceList from '../DeviceList/DeviceList'

const Row = styled(AntRow)`
  padding: 14px 12px;
  .ant-typography {
    color: #606266;
  }
`

const TableRow: React.FC<License & { idx: number }> = (
  {
    id,
    idx,
    created,
    expire,
    status,
    devices,
  }
) => {
  return (
    <>
      <Divider />
      <Row align={'middle'} gutter={8}>
        <Col span={3}>
          <Typography.Text ellipsis>
            {idx || '-'}
          </Typography.Text>
        </Col>
        <Col span={5}>
          <Tooltip title={created ? formatUnixTime(created) : '-'}>
            <Typography.Text ellipsis>
              { created ? formatUnixTime(created) : '-' }
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip title={(expire || expire === 0) ? `${expire} 天` : '-'}>
            <Typography.Text ellipsis>
              { (expire || expire === 0) ? `${expire} 天` : '-' }
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={4}>
          <LicenseStatusTag status={status} />
        </Col>
        <Col span={8}>
          <DeviceList devices={devices || []} />
        </Col>
      </Row>
    </>
  )
}

const TableBody: React.FC = () => {
  const [licenseList] = useAtom(deviceLicenseListAtom)

  return (
    <>
      {
        licenseList.map((license, idx) => (
          <TableRow key={license.id} {...license} idx={licenseList.length - idx} />
        ))
      }
    </>
  )

}

export default TableBody
