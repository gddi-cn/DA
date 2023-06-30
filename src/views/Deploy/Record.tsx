import React from 'react'
import { Button } from '@mui/material'

import AuthRecord from '@src/components/AuthRecord'
import { useAtom, useAtomValue } from 'jotai'
import { recordOpenAtom, recoredDefaultTabAtom } from './store'
import { currentModelIdAtom, currentModelVersionIdAtom } from '@src/store/dataset'

const Record: React.FC = () => {
  const [open, setOpen] = useAtom(recordOpenAtom)
  const defaultTab = useAtomValue(recoredDefaultTabAtom)
  const modelVersionId = useAtomValue(currentModelVersionIdAtom)
  const modelId = useAtomValue(currentModelIdAtom)

  return (
    <>
      <Button size='small' onClick={() => setOpen(true)}>
        查看授权记录 &gt;
      </Button>
      <AuthRecord
        open={open}
        onClose={() => setOpen(false)}
        modelVersionId={modelVersionId}
        defaultTab={defaultTab}
        modelId={modelId}
      />
    </>
  )
}

export default Record
