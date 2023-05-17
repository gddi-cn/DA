
import React from 'react'
import styled from 'styled-components'

import empty from '@src/asset/images/empty/chipEmpty.png'
import CreateBtn from './CreateBtn'

const NoDataWrap = styled.div`
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EmptyPic = styled.img`
  display: block;
  width: 267px;
  height: 200px;
  object-fit: cover;
`

const EmptyTip = styled.p`
  margin: 40px 0 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
`
const Nodata: React.FC = () => {
  return (
    <NoDataWrap>
      <EmptyPic src={empty} alt='No API' />
      <EmptyTip>抱歉，目前暂无任何服务记录，快来创建您的第一个服务吧</EmptyTip>
      <CreateBtn />
    </NoDataWrap>
  )
}

export default Nodata
