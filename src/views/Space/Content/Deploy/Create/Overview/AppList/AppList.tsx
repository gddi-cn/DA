import React from 'react'
import styled from 'styled-components'
import AppItem from './AppItem'

import { useAppList } from './hook'

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-top: 40px;
`

const Content = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 20px;
`

const AppList: React.FC = () => {
  const { appList } = useAppList()

  return (
    <>
      <Title>部署应用</Title>
      <Content>
        {
          appList.map(app => (
            <AppItem key={app.id} {...app} />
          ))
        }
      </Content>
    </>
  )
}

export default AppList

