import React from 'react'
import { Tag as AntTag } from 'antd'
import styled from 'styled-components'
import { LicenseStatus } from '@src/shared/enum/license'
import { licenseStatusColorMapping, licenseStatusNameMapping } from '@src/shared/mapping/license'

const Tag = styled(AntTag)`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 1px 12px;
  border-radius: 4px;
`

const LicenseStatusTag: React.FC<{ status: LicenseStatus }> = (
  {
    status,
  }
) => {
  const text = licenseStatusNameMapping.get(status) || '未知'
  const color = licenseStatusColorMapping.get(status) || '#ccc'

  return (
    <Tag color={color}>
      { text }
    </Tag>
  )
}

export default LicenseStatusTag
