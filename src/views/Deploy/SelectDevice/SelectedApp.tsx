import React from 'react'
import styled from 'styled-components'

import defaultCover from '@src/asset/images/platform/defaultCover.png'
import { useAtomValue } from 'jotai'
import { selectedAppAtom } from '../store'
import { formatUnixDate } from '@src/utils/tools'

const Container = styled.div`
  background: #EDF8FF;
  border-radius: 8px;
  padding: 20px 15px;
  overflow: hidden;
`

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`

const Divider = styled.hr`
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(98, 176, 229, 0.5);
  margin: 10px 0;
`

const Img = styled.img`
  display: block;
  object-fit: cover;
  height: 100px;
  width: 100%;
`

const Name = styled.p`
  margin-top: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #2582C1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Created = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #2582C1;
  margin-top: 4px;
`


const useSelectedApp = () => {
  const selectedApp = useAtomValue(selectedAppAtom)
  const {
    name,
    cover,
    create_time,
    adapter_device,
  } = selectedApp || {}

  const created = create_time ? formatUnixDate(create_time) : '-'

  return {
    name,
    cover,
    created,
    adapter_device,
  }
}


const SelectedApp: React.FC = () => {
  const { name, cover, created, adapter_device } = useSelectedApp()
  return (
    <>
      <Container>
        <Title>已选应用</Title>
        <Divider />
        <Img src={cover || defaultCover} alt={'cover'} />
        <Name>{name || '-'}</Name>
        <Created>{created}</Created>
      </Container>
    </>
  )
}

export default SelectedApp