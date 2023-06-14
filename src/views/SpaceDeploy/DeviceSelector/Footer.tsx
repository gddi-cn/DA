
import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import React from 'react'
import { pageAtom, pageSizeFilterAtom, deviceListTotalAtom } from './store'
import { SecondaryBtn, PrimaryBtn } from '@src/components/Btn'
import { selectedDeviceListAtom, useResetDeployStore } from '../store'
import { useToApp, useToOverview } from '../hook'

const pageSizeList = [10, 20, 50, 100]

const useFooter = () => {
  const selectedDeviceIdList = useAtomValue(selectedDeviceListAtom)
  const disabled = selectedDeviceIdList.length <= 0

  const handleCancel = useResetDeployStore()

  const handlePreStep = useToApp()
  const handleNextStep = useToOverview()

  return {
    disabled,
    handleCancel,
    handlePreStep,
    handleNextStep,
  }
}

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
  const {
    disabled,
    handleCancel,
    handlePreStep,
    handleNextStep,
  } = useFooter()

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <React.Suspense>
        <P />
      </React.Suspense>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: '12px',
      }}
    >
      <SecondaryBtn onClick={handleCancel}>
        取消
      </SecondaryBtn>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px',
        }}
      >
        <SecondaryBtn onClick={handlePreStep}>上一步</SecondaryBtn>
        <PrimaryBtn onClick={handleNextStep} disabled={disabled}>
          下一步
        </PrimaryBtn>
      </Box>
    </Box>
    </>
  )
}

export default Footer

