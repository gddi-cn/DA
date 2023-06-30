import { Box, Button, MenuItem, Pagination, Select, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

import empty from '@src/asset/images/empty/license_list_empty.png'
import { formatUinxTime } from '@src/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { cloudAuthDataAtom, cloudAuthListAtom, cloudAuthTotalAtom, pageAtom, pageSizeAtom } from './store';
import Scrollbars from 'react-custom-scrollbars';
import modelAPI from '@src/apis/model';
import { downloadBlob } from '@src/utils/tools';
import { modelIdAtom, modelVersionIdAtom } from '../store'

const gridTemplate = '2fr 3fr 3fr 2fr 2fr 2fr 2fr 2fr';

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

const NoData: React.FC = () => {
  return (
    <NoDataWrap>
      <EmptyPic src={empty} alt='No Deploy' />
      <EmptyTip>抱歉，目前暂无任何部署记录</EmptyTip>
    </NoDataWrap>
  )
}

const statusLabelMapping:
  Record<CloudAuth.Instance['status'], string> =
{
  1: '申请中',
  2: '已授权',
  3: '未通过',
  4: '已失效',
}

const statusBgMapping:
  Record<CloudAuth.Instance['status'], React.CSSProperties['backgroundColor']> =
{
  1: '#2582c2',
  2: '#19a051',
  3: '#FF6177',
  4: '#d9d9d9',
}

const AuthStatus: React.FC<{ status: CloudAuth.Instance['status'] }> = (
  {
    status
  }
) => {

  return (
    <Box
      sx={{
        backgroundColor: statusBgMapping[status],
        color: '#fff',
        px: '10px',
        width: 70,
        borderRadius: '6px',
      }}
    >
      {statusLabelMapping[status] ?? '-'}
    </Box>
  )
}

const RecordItem: React.FC<CloudAuth.Instance> = (auth) => {
  const {
    id,
    app_name,
    created,
    expire,
    quantity,
    call_count,
    call_remind,
    model_id: modelId,
    model_version_id: versionId,
    status,
  } = auth

  const [loading, setLoading] = React.useState<boolean>(false)

  const handleDownload = () => {
    if (loading || !id || !modelId || !versionId) return

    setLoading(true)

    Promise.all([
      modelAPI.downloadModel(modelId, versionId),
      modelAPI.downloadLicense(id, modelId, versionId)
    ])
      .then((resList) => {
        const success = resList.every(x => x.success)
        const dataList: Array<Blob> = resList.map(x => x.data).filter(Boolean) as Array<Blob>
        if (!success || dataList.length !== 2) return

        downloadBlob(dataList[0], 'model.gdd')
        downloadBlob(dataList[1], 'license')
      })
      .finally(() => {
        setLoading(false)
      })
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
      <Typography color='#606266' fontWeight={700}>
        {app_name || '--'}
      </Typography>
      <Typography color='#606266'>
        {formatUinxTime(created)}
      </Typography>
      <Typography color='#606266'>
        {formatUinxTime(expire)}
      </Typography>
      <Typography color='#606266'>
        {quantity}
      </Typography>
      <Typography color='#606266'>
        {call_count}
      </Typography>
      <Typography color='#606266'>
        {call_remind}
      </Typography>
      <AuthStatus status={status} />
      <Box display='flex' alignItems='center'>
        <Button size='small' onClick={handleDownload}>
        {
          loading ? '下载中...' : '下载授权文件和模型'
        }
        </Button>
      </Box>
    </Box>
  )
}

const List: React.FC<{ authList: Array<CloudAuth.Instance> }> = (
  {
    authList,
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
        authList.map(auth => (
          <RecordItem {...auth} key={auth.id} />
        ))
      }
    </Box>
  )
}

const pageSizeList = [10, 20, 50, 100]

const FooterLeft: React.FC = () => {
  const total = useAtomValue(cloudAuthTotalAtom)
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

const CloudList: React.FC = () => {
  const cloudAuthList = useAtomValue(cloudAuthListAtom)
  const refresh = useSetAtom(cloudAuthDataAtom)

  React.useEffect(
    () => {
      refresh()
    },
    []
  )

  if (cloudAuthList.length <= 0) return <NoData />

  return (
    <Box sx={{
      height: '100%', display: 'flex',
      flexDirection: 'column', alignItms: 'stretch',
    }}>
      <ListHeader>
        <HeaderCell>应用名称</HeaderCell>
        <HeaderCell>创建时间</HeaderCell>
        <HeaderCell>到期时间</HeaderCell>
        <HeaderCell>授权实例数</HeaderCell>
        <HeaderCell>调用次数</HeaderCell>
        <HeaderCell>剩余次数</HeaderCell>
        <HeaderCell>授权状态</HeaderCell>
        <HeaderCell>操作</HeaderCell>
      </ListHeader>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Scrollbars autoHide>
          <List authList={cloudAuthList} />
        </Scrollbars>
      </Box>
    </Box>
  )
}

const Cloud: React.FC = () => {

  return (
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
          <CloudList />
        </React.Suspense>
      </Box>
      <Footer />
    </Box>
  )
}

export default Cloud

