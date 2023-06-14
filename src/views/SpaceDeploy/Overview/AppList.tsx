import AppCard from '@src/components/AppCard/AppCard'
import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { selectedAppListAtom } from '../store'

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

const useAppList = () => {
  const [appList, setAppList] = useAtom(selectedAppListAtom)

  const handleRemove = (id: App.Instance['id']) => {
    setAppList(pre => pre.filter(x => x.id !== id))
  }

  return {
    appList,
    handleRemove,
  }
}

const AppList: React.FC = () => {
  const { appList, handleRemove } = useAppList()

  return (
    <>
      <Title>部署应用</Title>
      <Content>
        {
          appList.map(app => (
            <AppCard
              key={app.id}
              {...app}
              onRemove={handleRemove}
            />
          ))
        }
      </Content>
    </>
  )
}

export default AppList

