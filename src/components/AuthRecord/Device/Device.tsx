import { Box, MenuItem, Button, Typography, Pagination, Select } from '@mui/material'
import { formatUinxTime } from '@src/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components'
import { currentDeployAtom, deployDataAtom, deployListAtom, deployTotalAtom, detailOpenAtom, pageAtom, pageSizeAtom } from './store';
import Detail from './Detail'
import empty from '@src/asset/images/empty/chipEmpty.png'

const gridTemplate = '2fr 2fr 3fr 1fr';

const ListHeader = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(98, 176, 229, .5);
  display: grid;
  grid-template-columns: ${gridTemplate};
  column-gap: 4px;
`

const HeaderCell = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #061926;
`

const DeviceCount = styled.p<{ color?: React.CSSProperties['color'] }>`
  font-weight: 400;
  font-size: 14px;
  color: ${props => props.color};
`

const Line = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #606266;
`

const bgMapping = {
  Done: '#19a051',
  InProgress: '#2582c1',
  Failure: '#ff6177',
}

const NoDataWrap = styled.div`
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EmptyPic = styled.img`
  display: block;
  width: 267px;
  height: 200px;
  object-fit: cover;
`

const EmptyTip = styled.p`
  margin: 40px 0 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
`

const pageSizeList = [10, 20, 50, 100]

const FooterLeft: React.FC = () => {
  const total = useAtomValue(deployTotalAtom)
  const [page, setPage] = useAtom(pageAtom)
  const pageSize = useAtomValue(pageSizeAtom)

  const count = React.useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <>
      <Typography px={2} sx={{ display: { xs: 'none', lg: 'block' } }}>
        共 {total} 条记录
      </Typography>
      <Pagination
        count={count}
        page={page as number}
        onChange={(_, page) => handlePageChange(page)}
      />
    </>
  )
}

const Footer: React.FC = () => {
  const [pageSize, setPageSize] = useAtom(pageSizeAtom)

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <React.Suspense>
        <FooterLeft />
      </React.Suspense>
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

const RecordItem: React.FC<Sync.Instance> = (deploy) => {
  const {
    create_time,
    total,
    success_count,
    failed_count,
    pending_count,
  } = deploy

  const setCurrentDeploy = useSetAtom(currentDeployAtom)
  const setDetailOpen = useSetAtom(detailOpenAtom)

  const handleDetail = () => {
    setCurrentDeploy(deploy)
    setTimeout(() => setDetailOpen(true))
  }

  return (
    <Box
      sx={{
        padding: '10px 12px',
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: gridTemplate,
        columnGap: '4px',
        '&:hover': {
          backgroundColor: theme => theme.palette.action.hover,
        },
      }}
    >
      <Typography color='#606266'>{formatUinxTime(create_time)}</Typography>
      <Typography color='#62b0e5'>{total}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
        <DeviceCount color={bgMapping['Done']}>{success_count} 成功</DeviceCount>
        <Line>|</Line>
        <DeviceCount color={bgMapping['Failure']}>{failed_count} 失败</DeviceCount>
        <Line>|</Line>
        <DeviceCount color={bgMapping['InProgress']}>{pending_count} 等待中</DeviceCount>
      </Box>
      <Typography>
        <Button size='small' onClick={handleDetail}>查看详情</Button>
      </Typography>
    </Box>
  )
}

const NoData: React.FC = () => {
  return (
    <NoDataWrap>
      <EmptyPic src={empty} alt='No Deploy' />
      <EmptyTip>抱歉，目前暂无任何部署记录</EmptyTip>
    </NoDataWrap>
  )
}

const List: React.FC<{deployList: Array<Sync.Instance>}> = (
  {
    deployList,
  }
) => {

  return (
    <Box
      sx={{
        '> div:not(:last-of-type)': {
          borderBottom: '1px solid rgba(98, 176, 229, .5)',
        }
      }}
    >
      {
        deployList.map(deploy => (
          <RecordItem {...deploy} key={deploy.id} />
        ))
      }
    </Box>
  )
}

const DeviceList: React.FC = () => {
  const deployList = useAtomValue(deployListAtom)
  const refresh = useSetAtom(deployDataAtom)

  React.useEffect(
    () => {
      refresh()
    },
    []
  )

  if (deployList.length <= 0) return <NoData />

  return (
    <Box sx={{
      height: '100%', display: 'flex',
      flexDirection: 'column', alignItms: 'stretch',
    }}>
      <ListHeader>
        <HeaderCell>部署时间</HeaderCell>
        <HeaderCell>设备总数</HeaderCell>
        <HeaderCell>部署状态</HeaderCell>
        <HeaderCell>操作</HeaderCell>
      </ListHeader>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Scrollbars autoHide>
          <List deployList={deployList} />
        </Scrollbars>
      </Box>
    </Box>
  )
}


const Device: React.FC = () => {
  return (
    <React.Suspense>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          rowGap: '16px',
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <React.Suspense>
            <DeviceList />
          </React.Suspense>
        </Box>
        <Footer />
      </Box>
      <Detail />
    </React.Suspense>
  )
}

export default Device

