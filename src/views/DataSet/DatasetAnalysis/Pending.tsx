import React from 'react'
import Box from "@mui/material/Box";
import {styled} from '@mui/material'
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress, { linearProgressClasses, LinearProgressProps } from '@mui/material/LinearProgress';

import {useAtomValue, useSetAtom} from "jotai";
import {analysisAssessAtom, analysisProgressAtom} from "@views/DataSet/DatasetAnalysis/store";

const Loading = styled('div')`
  display: block;
  width: 400px;
  aspect-ratio: 5/4;
  object-fit: contain;
`


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const usePending = () => {
  const refresh = useSetAtom(analysisAssessAtom)
  const progress = useAtomValue(analysisProgressAtom)
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

  return {
    progress,
  }
}

const Pending: React.FC = () => {
  const { progress } = usePending()
  return (
    <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 1 }}>
        <CircularProgress size={100} sx={{ mb: 4 }} />
        <Box width={500}>
          <LinearProgressWithLabel value={progress} />
        </Box>
        <Typography variant={'h6'}>数据分析中，请耐心等待</Typography>
      </Box>
    </Box>
  )
}

export default Pending
