import { PrimaryBtn } from '@src/components/Button'
import React from 'react'

import { useCreateBtn } from './hook'

const CreateBtn: React.FC = () => {
  const { handleClick }  = useCreateBtn()

  return (
    <PrimaryBtn width={97} onClick={handleClick}>
      创建应用
    </PrimaryBtn>
  )
}

export default CreateBtn

