import React from 'react'
import { apiKeyListAtom, currentAPIKeyAtom, deleteDialogOpenAtom, refreshApiKeyAtom } from './store'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid, List, ListItem, Typography } from '@mui/material'
import { formatUinxTime } from '@src/utils'
import Empty from '@src/components/Empty'
import Btn, { LoadingBtn } from '@src/components/Btn'
import DialogTransition from '@src/components/DialogTransition'
import apiKeyAPI from '@src/apis/apiKey'
import { message } from 'antd'

const useAPIKeyList = () => {
  const apiKeyList = useAtomValue(apiKeyListAtom)

  return {
    apiKeyList,
  }
}

const useOpenDeleteDialog = () => {
  const setOpen = useSetAtom(deleteDialogOpenAtom)
  const setCurrent = useSetAtom(currentAPIKeyAtom)

  return (item: APIKey.Instance) => {
    setCurrent(item)
    setTimeout(() => setOpen(true))
  }
}

const useDeleteDialog = () => {
  const refresh = useSetAtom(refreshApiKeyAtom)
  const currentItem = useAtomValue(currentAPIKeyAtom)
  const [open, setOpen] = useAtom(deleteDialogOpenAtom)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleClose = () => {
    loading || setOpen(false)
  }

  const handleDelete = async () => {
    if (loading || !currentItem) return

    setLoading(true)
    const { success } = await apiKeyAPI.delete(currentItem.id)
    setLoading(false)

    refresh()
    if (!success) return

    setOpen(false)
    message.success('删除成功')
  }

  return {
    open,
    loading,
    handleClose,
    handleDelete,
  }
}

const DeleteDialog: React.FC = () => {
  const {
    open,
    loading,
    handleClose,
    handleDelete,
  } = useDeleteDialog()

  return (
    <Dialog
      open={open} onClose={handleClose}
      fullWidth maxWidth='xs'
      TransitionComponent={DialogTransition}
      PaperProps={{
        sx: {
          background: theme => theme.palette.blue.main,
          outline: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: '12px',
          p: '40px 40px 16px',
        }
      }}
    >
      <DialogTitle
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          p: 0,
        }}
      >
        删除 API Key
      </DialogTitle>
      <Box
        sx={{
          py: '20px'
        }}
      >
        <Typography>确定要删除该 API Key 吗？</Typography>
      </Box>
        <DialogActions sx={{ p: 0, columnGap: 3 }} disableSpacing>
        <Btn
          variant='outlined' color='black'
          onClick={handleClose} size='small'
          sx={{ width: 97 }}
        >
          取消
        </Btn>
        <LoadingBtn
          size='small' variant='contained' color='error'
          loading={loading} onClick={handleDelete}
          sx={{ width: 97 }}
        >
          删除
        </LoadingBtn>
      </DialogActions>
    </Dialog>
  )
}


const Item: React.FC<APIKey.Instance> = (item) => {
  const {
    name,
    access_id,
    secret_key,
    created
  } = item

  const openDeleteDialog = useOpenDeleteDialog()

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={2}>
          <Typography noWrap>{name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography noWrap>{access_id}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography noWrap>{secret_key}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography noWrap>{formatUinxTime(created)}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            sx={{ p: 0, minWidth: 0 }}
            size='small'
            color='error'
            disableRipple
            onClick={() => openDeleteDialog(item)}
          >
            删除
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  )
}

const Inner = () => {
  const { apiKeyList } = useAPIKeyList()

  if (!apiKeyList?.length) return <Empty />

  return (
    <List
      sx={{
        '& .MuiListItem-root': {
          color: '#606266',
          padding: '12px',
          '&:not(:last-of-type)': {
            borderBottom: '1px solid rgba(98, 176, 229, .5)'
          },
          '&:first-of-type': {
            fontWeight: 500,
            color: '#061926',
          },
          '.MuiTypography-root': {
            fontSize: '14px',
          },
        },
      }}
    >
      <ListItem>
        <Grid container>
          <Grid item xs={2}>
            <Typography>凭证名称</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Access ID</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Secret Key</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>创建时间</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>操作</Typography>
          </Grid>
        </Grid>
      </ListItem>
      {
        apiKeyList.map((apiKey) => (
          <Item key={apiKey.id} {...apiKey} />
        ))
      }
      <DeleteDialog />
    </List>
  )
}

const APIKeyList: React.FC = () => {

  return (
    <React.Suspense fallback={<h3>loading...</h3>}>
      <Inner />
    </React.Suspense>
  )
}

export default APIKeyList

