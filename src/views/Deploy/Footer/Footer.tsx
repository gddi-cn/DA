import React from 'react'
import { Box } from '@mui/material'

import Cancel from './Cancel'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { currentStepAtom, expireAtom, hideChannelAtom, limitAtom, recordOpenAtom, selectedAppAtom, selectedDeviceIdListAtom, syncTypeAtom, useResetStore } from '../store'
import { Deploy } from '../enums'
import Cloud from './Cloud'
import Device from './Device'
import { SecondaryBtn, PrimaryBtn, PrimaryLoadingBtn } from '@src/components/Btn'
import appAPI from '@src/apis/app'
import { multiDownload } from '@src/utils/tools'
import { message } from 'antd'

const ConfigAction: React.FC = () => {
  const syncType = useAtomValue(syncTypeAtom)
  const resetStore = useResetStore()
  const setRecordOpen = useSetAtom(recordOpenAtom)

  const [deploying, setDeploying] = React.useState<boolean>(false)
  const selectedDeviceIdList = useAtomValue(selectedDeviceIdListAtom)
  const selectedApp = useAtomValue(selectedAppAtom)
  const hideChannel = useAtomValue(hideChannelAtom)
  const _limit = useAtomValue(limitAtom)
  const expire_seconds = useAtomValue(expireAtom)

  const limit = hideChannel ? undefined : _limit

  const handleDeploy = async () => {
    if (!selectedDeviceIdList?.length) return
    if (!selectedApp?.id) return

    let success = false

    setDeploying(true)
    if (syncType === 'sync') {
      const res = await appAPI.sync(
        selectedApp.id,
        {
          device_ids: selectedDeviceIdList,
          expire_seconds,
          limit,
        }
      )

      success = res.success
    }
    if (syncType === 'export') {
      const { success, data } = await appAPI.export2(
        selectedApp.id,
        {
          device_ids: selectedDeviceIdList,
          expire_seconds,
          limit,
        },
      )

      data?.urls && multiDownload(data.urls)
    }
    setDeploying(false)

    if (!success) return

    if (syncType === 'sync') {
      message.success('下发成功')
      resetStore()
      setTimeout(() => {
        setRecordOpen(true)
      });
      // setCurrentStep(Platform.Step.NOTIFY)
    }
  }

  return (
    <>
      <PrimaryLoadingBtn loading={deploying} onClick={handleDeploy}>
        {
          syncType === 'export' ? '导出' : '下发'
        }
      </PrimaryLoadingBtn>
    </>
  )
}

const Actions: React.FC = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const selectedDeviceIdList = useAtomValue(selectedDeviceIdListAtom)

  if (currentStep === Deploy.Step.SELECT_APP) {
    return (
      <Box
        display={'flex'}
        alignItems='center'
        columnGap={'20px'}
      >
        {/* <Cloud /> */}
        <Device />
      </Box>
    )
  }

  if (currentStep === Deploy.Step.SELECT_DEVICE) {
    return (
      <Box
        display={'flex'}
        alignItems='center'
        columnGap={'20px'}
      >
        <SecondaryBtn onClick={() => setCurrentStep(Deploy.Step.SELECT_APP)}>
          上一步
        </SecondaryBtn>
        <PrimaryBtn
          disabled={selectedDeviceIdList.length <= 0}
          onClick={() => setCurrentStep(Deploy.Step.CONFIG)}
        >
          下一步
        </PrimaryBtn>
      </Box>
    )
  }

  if (currentStep === Deploy.Step.CONFIG) {

    return (
      <Box
        display={'flex'}
        alignItems='center'
        columnGap={'20px'}
      >
        <SecondaryBtn onClick={() => setCurrentStep(Deploy.Step.SELECT_DEVICE)}>
          上一步
        </SecondaryBtn>
        <ConfigAction />
      </Box>
    )
  }

  return null
}

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '8px 58px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #EDF8FF',
      }}
    >
      <Cancel />
      <Actions />
    </Box>
  )
}

export default Footer
