import syncAPI from "@src/apis/sync"
import { AppTemplateInput } from "@src/shared/enum/application"
import { Space } from "@src/views/Space/enums"
import { message } from "antd"
import { useAtom, useAtomValue } from "jotai"
import React from "react"
import { currentPageAtom } from "../../store"
import {
  stepAtom,
  selectedAppListAtom,
  selectedDeviceListAtom,
  limitAtom,
  expireAtom,
  appInputTypeAtom,
} from "../store"

export const useOverview = () => {
  const [, setStep] = useAtom(stepAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [appList] = useAtom(selectedAppListAtom)
  const [deviceList] = useAtom(selectedDeviceListAtom)
  const [expire] = useAtom(expireAtom)
  const _limit = useAtomValue(limitAtom)
  const inputType = useAtomValue(appInputTypeAtom)

  const limit = inputType === AppTemplateInput.IMAGE ? undefined : _limit

  const [exporting, setExporting] = React.useState<boolean>(false)
  const [syncing, setSyncing] = React.useState<boolean>(false)

  const data: Sync.SyncParams = {
    apps: appList.map(app => app.id),
    device_ids: deviceList.map(device => device.id),
    expire_seconds: expire === -1 ? expire : expire * 8.64e4,
    limit,
  }

  const handleCancel = () => {
    setCurrentPage(Space.Deploy.Page.LIST)
  }

  const handlePre = () => {
    setStep(Space.Deploy.Create.Step.APP)
  }

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
    const filename = appList.length === 1
      ? `${appList[0].name || appList[0].id}.gem`
      : 'export.tar'
    setExporting(true)
    await syncAPI.export(data, filename)
    setExporting(false)
  }

  return {
    handleCancel,
    handlePre,
    handleDeploy,
    handleExport,
    exporting,
    syncing,
  }
}
