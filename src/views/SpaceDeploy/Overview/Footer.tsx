import React from 'react'
import { Box } from '@mui/material'

import { PrimaryLoadingBtn, SecondaryBtn, SecondaryLoadingBtn } from '@src/components/Btn'
import { useAtomValue } from 'jotai'
import { expireAtom, limitAtom, selectedAppListAtom, selectedDeviceListAtom, useResetDeployStore } from '../store'
import { inputFilterAtom } from '../AppSelector/store'
import { AppTemplateInput } from '@src/shared/enum/application'
import { useToDevice } from '../hook'
import { message } from 'antd'
import syncAPI from '@src/apis/sync'
import { multiDownload } from '@src/utils/tools'

const useFooter = () => {
  const appList = useAtomValue(selectedAppListAtom)
  const deviceList = useAtomValue(selectedDeviceListAtom)
  const expire = useAtomValue(expireAtom)
  const _limit = useAtomValue(limitAtom)
  const inputType = useAtomValue(inputFilterAtom)

  const limit = inputType === AppTemplateInput.IMAGE ? undefined : _limit

  const [exporting, setExporting] = React.useState<boolean>(false)
  const [syncing, setSyncing] = React.useState<boolean>(false)

  const data: Sync.SyncParams = {
    apps: appList.map(app => app.id),
    device_ids: deviceList.map(device => device.id),
    expire_seconds: expire === -1 ? expire : expire * 8.64e4,
    limit,
  }

  const invalid = !appList.length || !deviceList.length

  const handleCancel = useResetDeployStore()

  const handlePre = useToDevice()

  const handleDeploy = async () => {
    if (limit !== undefined && limit < 0) {
      message.warn('请设置正确的路数')
      return
    }

    setSyncing(true)
    const { success } = await syncAPI.sync(data)
    setSyncing(false)

    if (!success) return

    message.success('开始下发')

    handleCancel()
  }

  const handleExport = async () => {
    setExporting(true)
    const { success, data: _data } = await syncAPI.export2(data)
    setExporting(false)

    if (!success || !_data?.urls?.length) return

    multiDownload(_data.urls)
  }

  return {
    exporting,
    syncing,
    invalid,
    handleCancel,
    handlePre,
    handleDeploy,
    handleExport,
  }
}

const Footer: React.FC = () => {
  const {
    exporting,
    syncing,
    invalid,
    handleCancel,
    handlePre,
    handleDeploy,
    handleExport,
  } = useFooter()

  const disabled = exporting || syncing

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <SecondaryBtn disabled={disabled} onClick={handleCancel}>
        取消
      </SecondaryBtn>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px',
        }}
      >
        <SecondaryBtn disabled={disabled} onClick={handlePre}>
          上一步
        </SecondaryBtn>
        <SecondaryLoadingBtn loading={exporting} disabled={syncing || invalid} onClick={handleExport}>
          离线导出
        </SecondaryLoadingBtn>
        <PrimaryLoadingBtn loading={syncing} disabled={exporting || invalid} onClick={handleDeploy}>
          在线部署
        </PrimaryLoadingBtn>
      </Box>
    </Box>
  )
}

export default Footer
