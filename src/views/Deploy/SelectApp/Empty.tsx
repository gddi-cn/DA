import React from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add'

import empty from '@src/asset/images/platform/app_list_empty.png'
import Btn from '@src/components/Btn'
import { useOpenCreateApp } from './hook'

const Container = styled.div`
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 533px;
  background: #EDF8FF;
  border-radius: 8px;
  max-width: 664px;
  margin: 24px auto 0;
  overflow: hidden;
`

const Img = styled.img`
  display: block;
  width: 260px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 40px;
`

const Title = styled.p`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const Tip = styled.p`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
`

const Empty: React.FC = () => {
  const handleOpenCreateApp = useOpenCreateApp()

  return (
      <Container>
        <Img src={empty} alt={'No Data'}/>
        <Title>无已创建应用</Title>
        <Tip>目前暂无创建任何应用，快点下方按钮创建吧</Tip>
        <Btn
          variant='contained' color='primaryBlue' sx={{ width: 208 }}
          onClick={handleOpenCreateApp}
        >
          <AddIcon />
          创建新应用
        </Btn>
      </Container>
  )
}

export default Empty
