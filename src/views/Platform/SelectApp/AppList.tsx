import React from 'react'
import styled from 'styled-components'

import { useAppList } from './hook'
import AppItem from './AppItem'


const Grid = styled.div`
  padding: 40px 20px;
  display: grid;
  gap: 20px;
  grid-template: auto/repeat(3, 1fr);
  width: 100%;
  overflow: hidden;
`

const AppList: React.FC = () => {
  const { appList } = useAppList()
  return (
    <Grid>
      {
        appList.map(app => (
          <AppItem key={app.id} {...app} />
        ))
      }
    </Grid>
  )
}

export default AppList
