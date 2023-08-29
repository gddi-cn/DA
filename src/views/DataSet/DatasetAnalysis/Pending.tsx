import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from 'styled-components'

import loading from '@src/asset/images/g_loading.gif'
import {useSetAtom} from "jotai";
import {analysisAssessAtom} from "@views/DataSet/DatasetAnalysis/store";
import {timer} from "d3";

const Loading = styled.img`
  display: block;
  width: 200px;
  aspect-ratio: 5/4;
  object-fit: contain;
`

const usePending = () => {
  const refresh = useSetAtom(analysisAssessAtom)
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(
    () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      timerRef.current = setInterval(
        () => {
          refresh()
        },
        5e3,
      )

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    },
    []
  )
}

const Pending: React.FC = () => {
  usePending()
  return (
    <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 1 }}>
        <Loading src={loading} alt={'loading'} />
        <Typography>数据分析中，请耐心等待</Typography>
      </Box>
    </Box>
  )
}

export default Pending
