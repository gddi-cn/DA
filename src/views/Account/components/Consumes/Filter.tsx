import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'

import { consumeTypeAtom, filterAtom } from './store'
import { User as EUser } from '@src/shared/enum/user'
import { consumeTypeNameMapping } from '@src/shared/mapping/user'

const options = Object.values(EUser.Consume.Type)
  .filter((value): value is EUser.Consume.Type => typeof value === 'number')
  .map(value => ({
    value,
    label: consumeTypeNameMapping.get(value),
  }))

const useFilter = () => {
  const consumeType = useAtomValue(consumeTypeAtom)
  const setFilter = useSetAtom(filterAtom)

  const handleConsumeTypeChange = (event: SelectChangeEvent<EUser.Consume.Type>) => {
    setFilter((pre: any) => ({
      ...pre,
      consume_type: event.target.value as EUser.Consume.Type,
      page: 1,
    }))
  }

  return {
    consumeType,
    handleConsumeTypeChange,
  }
}

const Filter: React.FC = () => {
  const { consumeType, handleConsumeTypeChange } = useFilter()

  return (
    <Select
      value={consumeType} onChange={handleConsumeTypeChange}
      size='small'
      sx={{
        width: 180,
      }}
      inputProps={{
        sx: {
          fontSize: 14,
          padding: '6px 14px',
        }
      }}
    >
      {
        options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      }
    </Select>
  )
}

export default Filter

