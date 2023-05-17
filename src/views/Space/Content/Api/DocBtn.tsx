import { SecondaryBtn } from '@src/components/Button'
import React from 'react'

const href = 'https://s3.sz.cdn.desauto.net/public/docs/Desauto_AI_Open_API_v2.pdf'

const DocBtn: React.FC = () => {
  return (
    <SecondaryBtn href={href} target={'_blank'}>
      查看文档
    </SecondaryBtn>
  )
}

export default DocBtn

