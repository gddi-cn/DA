import { Select } from 'antd'
import React from 'react'

import { useSortSelector } from './hook'

const SortSelector: React.FC<SortSelector.Props> = (params) => {
  const {
    options,
    value,
    handleChange,
  } = useSortSelector(params)

  return (
    <>
      <Select
        style={{ width: 150 }}
        bordered={false}
        options={options}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

export default SortSelector

