import React from 'react'
import {
  Box,
  Button,
  Dialog, DialogActions,
  DialogContent,
  List,
  ListItem, ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography
} from "@mui/material";
import DialogTransition from "@src/components/DialogTransition";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import dp from './dp.png'
import Btn, {LoadingBtn} from "@src/components/Btn";
import dpAPI from "@src/apis/dp";

const docHref = 'https://vme0c7akap.feishu.cn/docx/QjuNdPU3WokgzHxOtLjcwSyBnlf'

const Img = styled('img')`
  width: 570px;
  aspect-ratio: 3/2;
  object-fit: contain;
  display: block;
`

const useAppDownload = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [url, setUrl] = React.useState<string>('')
  const unSupported = !url && !loading

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(
    () => {

      dpAPI.latestVersionURL()
        .then(({ success, data }) => {
          if (!success || !data) {
            setUrl('')
            return
          }
          setUrl(data.url ?? '')
        })
        .finally(() => setLoading(false))

      return () => {
        setTimeout(() => {
          setLoading(true)
          setUrl('')
        }, 300)
      }
    },
    []
  )

  return {
    url,
    loading,
    open,
    unSupported,
    handleOpen,
    handleClose,
  }
}

const AppDownload: React.FC = () => {
  const {
    url,
    loading,
    open,
    unSupported,
    handleOpen,
    handleClose,
  } = useAppDownload()

  return (
    <>
      <Dialog
        open={open} onClose={handleClose}
        TransitionComponent={DialogTransition}
        fullWidth maxWidth={'lg'}
        PaperProps={{
          sx: {
            background: theme => theme.palette.blue.main,
            outline: theme => `2px solid ${theme.palette.primary.main}`,
            borderRadius: '12px',
            p: '40px 40px 16px',
          }
        }}
      >
        <DialogContent sx={{ display: 'flex', columnGap: 6 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography component={'h1'} variant={'h4'}>共达地本地数据助手</Typography>
            <Typography component={'p'} variant={'subtitle1'} color={'text.secondary'} sx={{ maxWidth: 320 }}>
              关联共达地训练平台账号，用于数据处理、校验、上传的本地工具
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText primary={'支持更多数据格式'} primaryTypographyProps={{ variant: 'h6', component: 'h2' }} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText primary={'数据格式快速校验'} primaryTypographyProps={{ variant: 'h6', component: 'h2' }} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText primary={'数据一键稳定上传'} primaryTypographyProps={{ variant: 'h6', component: 'h2' }} />
              </ListItem>
              <ListItem>
                <Button href={docHref} target={'_blank'} rel={'noreferrer'}>了解更多</Button>
              </ListItem>
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingBtn
                color={'black'} size={'large'}
                variant={'contained'} sx={{ width: 240, maxWidth: '80%' }}
                disabled={unSupported}
                loading={loading}
                href={url}
                target={'_blank'}
                rel={'noreferrer'}
              >
                立即下载
              </LoadingBtn>
            </Box>
          </Box>
          <Box sx={{ boxShadow: 2 }}>
            <Img src={dp} alt={'preview'} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', px: 3 }}>
          <Typography variant={'caption'} component={'p'} color={'text.secondary'}>
            当前支持：Windows（Win10 64位、Win11 64位）、Linux版本（dep格式）
          </Typography>
          <Btn onClick={handleClose} color={'black'} variant={'outlined'} sx={{ minWidth: 137 }}>
            返回
          </Btn>
        </DialogActions>
      </Dialog>
      <Button onClick={handleOpen}>
        共达地本地数据助手
      </Button>
    </>
  )
}

export default AppDownload
