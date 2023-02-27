import { useBack2DatasetIndex } from '@src/hooks/task'
import React from 'react'
import { SecondaryBtn } from '../Button'

const Back2Dataset: React.FC<{ label?: string }> = (
  {
    label = '取消'
  }
) => {
  const handleBack = useBack2DatasetIndex()

  return (
    <SecondaryBtn
      width={132}
      onClick={handleBack}
    >
      {label}
    </SecondaryBtn>
  )
}

export default Back2Dataset

