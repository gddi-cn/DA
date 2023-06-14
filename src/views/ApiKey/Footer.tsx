import { Box, MenuItem, Select, Typography, Pagination } from '@mui/material'
import React from 'react'
import { apiKeyTotalAtom, pageAtom, pageSizeAtom } from './store'
import { useAtom, useAtomValue } from 'jotai'

const pageSizeList = [10, 20, 50, 100]

const useFooter = () => {
  const [page, setPage] = useAtom(pageAtom)
  const [pageSize, setPageSize] = useAtom(pageSizeAtom)
  const total = useAtomValue(apiKeyTotalAtom)
  const count = React.useMemo(() => Math.ceil(total / (pageSize as number)), [total, pageSize])

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
    setPage(1)
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

const Inner: React.FC = () => {
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
        page={page as number}
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

const Footer: React.FC = () => {
  return (
    <React.Suspense>
      <Inner />
    </React.Suspense>
  )
}

export default Footer

