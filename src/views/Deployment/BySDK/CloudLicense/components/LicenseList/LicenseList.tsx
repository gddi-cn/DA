import React from 'react'

import { useListData } from './hook'
import NoData from './NoData'
import LicenseTable from './LicenseTable'

const LicenseList: React.FC = () => {
  const { noData } = useListData()

  return noData ? (
    <NoData />
  ) : (
    <LicenseTable />
  )
}

export default LicenseList
