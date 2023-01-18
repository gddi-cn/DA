import React from 'react'
import styled from 'styled-components'
import { Select as AntSelect } from 'antd'

import { User } from '@src/shared/enum/user'
import { consumeTypeNameMapping } from '@src/shared/mapping/user'
import { useFilter } from './hook'

const Select = styled(AntSelect)`
  width: 180px;
  margin-top: 20px;
`

const options: Array<{ key: number, label: string, value?: User.Consume.Type }> =
  Object.values(User.Consume.Type)
    .filter(x => !isNaN(parseInt(x as any)))
    .map(t => ({
      key: t as number,
      label: consumeTypeNameMapping.get(t as User.Consume.Type) || '-',
      value: t as User.Consume.Type,
    }));

const Filter: React.FC = () => {
  const { type, handleChange, } = useFilter()
  return (
    <Select options={options} value={type} onChange={handleChange} />
  )
}

export default Filter
