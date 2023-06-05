import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { useApi } from './hook'

import List from './List'
import Nodata from './Nodata'
import ItemDeleter from './ItemDeleter'
import ItemCreator from './ItemCreator'

const Container = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, .4)
`

const Api: React.FC = () => {
  const { loading, empty } = useApi()

  return (
    <Container>
      {
        empty ? <Nodata /> : <List />
      }
      {
        loading ? (
          <LoadingWrap>
            <Spin spinning />
          </LoadingWrap>
        ) : null
      }
      <ItemDeleter />
      <ItemCreator />
    </Container>
  )
}

export default Api

