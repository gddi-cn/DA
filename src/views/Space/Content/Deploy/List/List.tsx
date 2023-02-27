import React from 'react'
import styled from 'styled-components'

import Nodata from './Nodata'
import DeployList from './DeployList'

import { useList } from './hook'
import { Spin } from 'antd'

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

const List: React.FC = () => {
  const { empty, loading } = useList()

  return (
    <Container>
      {
        empty ? <Nodata /> : <DeployList />
      }
      { 
        loading ? (
          <LoadingWrap>
            <Spin spinning />
          </LoadingWrap>
        ) : null
      }
    </Container>
  )
}

export default List

