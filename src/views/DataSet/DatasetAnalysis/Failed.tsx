import React from 'react'

import { ReactComponent as FailedIcon } from './failed.svg'
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import { PrimaryLoadingBtn } from '@src/components/Btn'
import {useAtomValue, useSetAtom} from "jotai";
import {analysisAssessAtom, datasetDetailAtom} from "./store";
import datasetAPI from "@src/apis/dataset";
import {message} from "antd";

const useFailed = () => {
  const datasetDetail = useAtomValue(datasetDetailAtom)
  const [loading, setLoading] = React.useState(false)
  const refresh = useSetAtom(analysisAssessAtom)

  const handleRetry = async () => {
    if (loading || !datasetDetail?.id) return

    try {
      setLoading(true)
      const { success } = await datasetAPI.createAssess(datasetDetail.id)
      if (!success) {
        message.error('启动数据集分析失败')
        return
      }
      message.info('开始数据集分析')
    } catch (e) {
      console.error(e)
    } finally {
      refresh()
      setLoading(false)
    }

  }

  return {
    handleRetry,
  }
}

const Failed: React.FC = () => {
  const { handleRetry } = useFailed()

  return (
    <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, alignItems: 'center' }}>
        <FailedIcon />
        <Typography>抱歉，数据集分析失败</Typography>
        <PrimaryLoadingBtn onClick={handleRetry}>重试</PrimaryLoadingBtn>
      </Box>
    </Box>
  )
}

export default Failed
