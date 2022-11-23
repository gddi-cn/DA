import React from 'react'
import { useAtom } from 'jotai'
import { Col, Row as AntRow, Tooltip, Typography } from 'antd'
import styled from 'styled-components'

import { License } from '@src/shared/types/license'
import { formatUnixTime } from '@src/utils/tools'
import { LicenseStatus } from '@src/shared/enum/license'
import { cloudLicenseListAtom } from './store'

import LicenseStatusTag from '@src/components/LicenseStatusTag'
import Divider from '../../../components/Divider'
import Download from './DownLoad'
import moment from 'moment'

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
    quantity,
    call_count,
  }
) => {
  const e = status === LicenseStatus.UNDER_REVIEW ?
    '-' : ((expire || expire === 0)
      ? `${moment(expire * 1000).format('YYYY/MM/DD')}` : '-')

  const q = status === LicenseStatus.UNDER_REVIEW ?
    '-' : ((quantity || quantity === 0)
    ? quantity : '-')

  const c =  status === LicenseStatus.UNDER_REVIEW ? '-' : ((call_count || call_count === 0) ? call_count : '-')

  return (
    <>
      <Divider />
      <Row align={'middle'} gutter={8}>
        <Col span={2}>
          <Typography.Text ellipsis>
            {idx || '-'}
          </Typography.Text>
        </Col>
        <Col span={4}>
          <Tooltip title={created ? formatUnixTime(created) : '-'}>
            <Typography.Text ellipsis>
              { created ? formatUnixTime(created) : '-' }
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip title={e}>
            <Typography.Text ellipsis>
              {e}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={3}>
          <Tooltip title={q}>
            <Typography.Text ellipsis>
              {q}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={3}>
          <Tooltip title={c}>
            <Typography.Text ellipsis>
              {c}
            </Typography.Text>
          </Tooltip>
        </Col>
        <Col span={3}>
          <LicenseStatusTag status={status} />
        </Col>
        <Col span={5}>
          <Download disabled={status !== LicenseStatus.PASS} id={id} />
        </Col>
      </Row>
    </>
  )
}

const TableBody: React.FC = () => {
  const [licenseList] = useAtom(cloudLicenseListAtom)

  return (
    <div style={{ minHeight: 260 }}>
      {
        licenseList.map((license, idx) => (
          <TableRow key={license.id} {...license} idx={licenseList.length - idx} />
        ))
      }
    </div>
  )

}

export default TableBody
