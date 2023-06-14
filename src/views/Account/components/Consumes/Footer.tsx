import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material'
import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { loadable } from 'jotai/utils'

import { consumesAtom, filterAtom, pageAtom, pageNumberAtom } from './store'

const loadableConsumesAtom = loadable(consumesAtom)

const pageSizeList = [10, 20, 50, 100]

const useFooter = () => {
  const page = useAtomValue(pageAtom)
  const pageSize = useAtomValue(pageNumberAtom)
  const value = useAtomValue(loadableConsumesAtom)
  const setFilter = useSetAtom(filterAtom)

  let total = 0

  if (value.state === 'hasError') total = 0
  if (value.state === 'hasData' && value.data) total = value.data.total

  const count = React.useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  const handlePageChange = (page: number) => {
    setFilter(pre => ({ ...pre, page }))
  }

  const handlePageSizeChange = (page_size: number) => {
    setFilter(pre => ({ ...pre, page: 1, page_size }))
  }

  return {
    page,
    pageSize,
    total,
    count,
    handlePageChange,
    handlePageSizeChange,
  }
}

const Footer: React.FC = () => {
  const {
    page,
    pageSize,
    total,
    count,
    handlePageChange,
    handlePageSizeChange,
  } = useFooter()

  if (total <= 0) return null

  return (

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Typography px={2} sx={{ display: { xs: 'none', lg: 'block' } }}>
        共 {total} 条记录
      </Typography>
      <Pagination
        count={count}
        page={page}
        onChange={(_, page) => handlePageChange(page)}
      />
      <Select
        value={pageSize}
        onChange={event => handlePageSizeChange(event.target.value as number)}
        size='small'
        variant='standard'
      >
        {
          pageSizeList.map(pageSize => (
            <MenuItem key={pageSize} value={pageSize}>{pageSize} 条 / 页</MenuItem>
          ))
        }
      </Select>
    </Box>
  )
}

export default Footer

