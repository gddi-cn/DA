import React from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { SecondaryBtn } from '@src/components/Btn'
import DialogTransition from '@src/components/DialogTransition'
import { useAtom } from 'jotai'
import { currentAppIdAtom, currentDeployAtom, currentPageAtom, detailOpenAtom } from './store'
import { formatUnixTime } from '@src/utils/tools'

import { ReactComponent as FilterAllIcon } from '@src/asset/icons/space/filter_all.svg'
import { ReactComponent as FilterSuccessIcon } from '@src/asset/icons/space/filter_success.svg'
import { ReactComponent as FilterPendingIcon } from '@src/asset/icons/space/filter_pending.svg'
import { ReactComponent as FilterFailIcon } from '@src/asset/icons/space/filter_fail.svg'
import DeviceList from './DeviceList'
import { message } from 'antd'
import syncAPI from '@src/apis/sync'
import AppDetail from '@src/components/AppDetail/AppDetail'

const bgMapping = {
  Done: '#eaf5ee',
  InProgress: '#eff8ff',
  Failure: '#fdf1f2',
}

const colorMapping = {
  Done: '#19A051',
  InProgress: '#2582C1',
  Failure: '#FF6177',
}

const labelMapping = {
  All: '全部设备',
  Done: '部署成功',
  InProgress: '部署中',
  Failure: '部署失败',
}

const Created = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8C8C8C;
`

const FilterWrap = styled.div`
  display: flex;
  column-gap: 20px;
`

const FilterItem = styled.div<{ bg?: React.CSSProperties['backgroundColor'], oc?: React.CSSProperties['outlineColor'] }>`
  border-radius: 4px;
  background-color: ${props => props.bg || 'unset'};
  width: 147px;
  padding: 10px;
  display: flex;
  column-gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: filter ease-in .1s;
  &:not(:hover) {
    filter: drop-shadow(0 0 4px rgba(25, 82, 193, 0.25));
  }
  &:hover:not([selected]) {
    /* box-shadow: 1px 2px 4px rgba(177, 191, 202, 0.36); */
    filter: drop-shadow(0 0 8px rgba(25, 82, 193, 0.25));
  }
  &[selected] {
    outline: 2px solid ${props => props.oc || '#48A2DF'};
  }
`

const FilterConent = styled.div<{ color?: React.CSSProperties['color']}>`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  p {
    &:first-of-type {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #061926;
    }
    &:last-of-type {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: ${props => props.color || 'rgba(0, 0, 0, .85)'};
    }

  }
`

const SubTitle = styled.p<{ mt?: React.CSSProperties['marginTop']}>`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin-top: 40px;
`

const setSelected = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const $c = ref.current

  if (!$c) return

  $c.setAttribute('selected', '')
}

const removeSelected = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const $c = ref.current

  if (!$c) return

  $c.removeAttribute('selected')
}

const useDetail = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const [currentAppId, setCurrentAppId] = useAtom(currentAppIdAtom)
  const [open, setOpen] = useAtom(detailOpenAtom)
  const [currentDeploy, setCurrentDeploy] = useAtom(currentDeployAtom)
  const [currentState, setCurrentState] =
    React.useState<Sync.Instance['sync_state'] | 'All'>('All')

  const allRef = React.useRef<HTMLDivElement | null>(null)
  const successRef = React.useRef<HTMLDivElement | null>(null)
  const pendingRef = React.useRef<HTMLDivElement | null>(null)
  const failRef = React.useRef<HTMLDivElement | null>(null)

  const {
    create_time,
    total,
    pending_count,
    success_count,
    failed_count,
    devices,
  } = currentDeploy || {}

  const onAppClose = () => {
    setCurrentPage('deploy')
    setTimeout(() => {
      setCurrentAppId(null)
    }, 100);
  }

  const handleClick = (state: Sync.Instance['sync_state'] | 'All') => {
    if (state === currentState) return
    setCurrentState(state)
  }

  const deviceList = currentState === 'All'
    ? devices || []
    : (devices || []).filter(d => {
      return  d.sync_state === (currentState as Sync.Instance['sync_state'])
    })

  if (currentState === 'Failure') {
    deviceList.forEach(device => {
      device.syncs = device.syncs?.filter(s => s.sync_state === 'Failure') || []
    })
  }

  const handleClose = () => {
    setOpen(false)

    setTimeout(() => {
      setCurrentDeploy(null)
      setCurrentPage('deploy')
      setCurrentAppId(null)
    }, 300)
  }

  const fetchDetail = async (id: Sync.Instance['id']) => {
    const { success, data } = await syncAPI.detail(id)

    if (!success || !data) return

    setCurrentDeploy(data)
  }

  React.useEffect(
    () => {
      if (!currentDeploy?.id) return
      fetchDetail(currentDeploy.id)
    },
    [currentDeploy]
  )

  React.useEffect(
    () => {
      switch(currentState) {
        case 'All':
          setSelected(allRef)
          removeSelected(successRef)
          removeSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'Done':
          removeSelected(allRef)
          setSelected(successRef)
          removeSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'InProgress':
          removeSelected(allRef)
          removeSelected(successRef)
          setSelected(pendingRef)
          removeSelected(failRef)
          break
        case 'Failure':
          removeSelected(allRef)
          removeSelected(successRef)
          removeSelected(pendingRef)
          setSelected(failRef)
          break
        default:
          break
      }
    },
    [currentState]
  )

  return {
    open,
    currentPage,
    currentAppId,
    created: create_time ? formatUnixTime(create_time) : '--',
    total,
    pending_count,
    success_count,
    failed_count,
    allRef,
    successRef,
    pendingRef,
    failRef,
    handleClick,
    deviceList,
    handleClose,
    onAppClose,
  }
}

const Detail: React.FC = () => {
  const {
    open,
    currentPage,
    currentAppId,
    created,
    total,
    pending_count,
    success_count,
    failed_count,
    allRef,
    successRef,
    pendingRef,
    failRef,
    handleClick,
    deviceList,
    handleClose,
    onAppClose,
  } = useDetail()

  const Deploy = (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '0 40px',
        }}
      >
        <Typography
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            fontSize: '1.25rem',
          }}
        >
          授权详情
        </Typography>
        <Created>{created}</Created>
      </DialogTitle>
      <DialogContent sx={{ flex: 1, px: 0 }}>
        <Scrollbars autoHide>
          <Box
            sx={{
              px: '40px',
              py: '20px',
            }}
          >
            <FilterWrap>
              <FilterItem
                ref={allRef}
                bg={bgMapping['InProgress']}
                onClick={() => handleClick('All')}
              >
                <FilterAllIcon />
                <FilterConent color={colorMapping['InProgress']}>
                  <p>{labelMapping['All']}</p>
                  <p>{total || 0}</p>
                </FilterConent>
              </FilterItem>
              <FilterItem
                ref={successRef}
                bg={bgMapping['Done']}
                onClick={() => handleClick('Done')}
                oc={colorMapping['Done']}
              >
                <FilterSuccessIcon />
                <FilterConent
                  color={colorMapping['Done']}
                  onClick={() => handleClick('Done')}
                >
                  <p>{labelMapping['Done']}</p>
                  <p>{success_count || 0}</p>
                </FilterConent>
              </FilterItem>
              <FilterItem
                ref={pendingRef}
                bg={bgMapping['InProgress']}
                onClick={() => handleClick('InProgress')}
              >
                <FilterPendingIcon />
                <FilterConent color={colorMapping['InProgress']}>
                  <p>{labelMapping['InProgress']}</p>
                  <p>{pending_count || 0}</p>
                </FilterConent>
              </FilterItem>
              <FilterItem
                ref={failRef}
                bg={bgMapping['Failure']}
                onClick={() => handleClick('Failure')}
                oc={colorMapping['Failure']}
              >
                <FilterFailIcon />
                <FilterConent color={colorMapping['Failure']}>
                  <p>{labelMapping['Failure']}</p>
                  <p>{failed_count || 0}</p>
                </FilterConent>
              </FilterItem>
            </FilterWrap>
            <SubTitle mt={'40px'}>
              设备下发详情
            </SubTitle>
            <DeviceList deviceList={deviceList} />
          </Box>
        </Scrollbars>
      </DialogContent>
      <DialogActions
        sx={{
          px: '40px'
        }}
      >
        <SecondaryBtn onClick={handleClose}>
          确定
        </SecondaryBtn>
      </DialogActions>
    </>
  )

  return (
    <Dialog
      open={open} onClose={handleClose}
      fullWidth maxWidth={'ll'}
      TransitionComponent={DialogTransition}
      PaperProps={{
        sx: {
          background: theme => theme.palette.blue.main,
          outline: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: '12px',
          p: `${currentPage === 'app' ? 0 : 40}px 0px 16px`,
          height: '97vh',
        }
      }}
    >
      {
        currentPage === 'app' && currentAppId
          ? <AppDetail id={currentAppId} onClose={onAppClose} />
          : Deploy
      }
    </Dialog>
  )
}

export default Detail

