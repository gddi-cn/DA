import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { pageAtom, pageSizeFilterAtom, deviceListTotalAtom } from './store'
import Actions from './Actions/Actions'

const pageSizeList = [10, 20, 50, 100]

const usePagination = () => {
  const [page, setPage] = useAtom(pageAtom)
  const [pageSize, setPageSize] = useAtom(pageSizeFilterAtom)
  const total = useAtomValue(deviceListTotalAtom)

  const count = React.useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
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

const P: React.FC = () => {
  const {
    page,
    pageSize,
    total,
    count,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination()

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <React.Suspense>
        <>
          <Actions />
          <P />
        </>
      </React.Suspense>
    </Box>
  )
}

export default Footer

