import { Button } from '@mui/material'
import React from 'react'

import AuthRecord from '@src/components/AuthRecord'

const DeployRecord: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <>
      <Button size='small' onClick={() => setOpen(true)}>
        查看授权记录 &gt;
      </Button>
      <AuthRecord
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default DeployRecord
