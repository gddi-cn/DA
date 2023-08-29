import React, {Suspense} from 'react'
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

import Pending from './Pending'
import Analysis from './Analysis'
import Failed from './Failed'
import {useAtomValue} from "jotai";
import {analysisAssessAtom} from "@views/DataSet/DatasetAnalysis/store";
import {DatasetAnalysisStatus} from "@src/shared/enum/dataset";

type State = 'pending' | 'success' | 'failed' | 'init'

const useContent = () => {
  const access = useAtomValue(analysisAssessAtom)
  const state: State = !access
    ? 'init'
    : access.status === DatasetAnalysisStatus.FINISHEd
    ? 'success'
    : access?.status === DatasetAnalysisStatus.FAILED
    ? 'failed'
    : 'pending'

  return {
    state,
  }
}

const Fallback: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

const Inner: React.FC = () => {
  const { state } = useContent()

  if (state === 'init')
    return null

  if (state === 'pending')
    return <Pending />

  if (state === 'success')
    return <Analysis />

  if (state === 'failed')
    return <Failed />

  return null
}

const Content: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Inner />
    </Suspense>
  )
}

export default Content
