import React from 'react'

import ZoomArea from '@src/components/ZoomArea'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #cb7a4e;
`

const Item = styled.div`
  width: 300px;
  height: 300px;
  background-color: #aaeeaa;
`

const src = 'http://s3.ceph.k8s.gddi.com/storage-0l6qoa/false_analysis/5567cc45d8a59945abe710985a5d8d2b4caee406.png'

const RawImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const Test: React.FC = () => {
  return (
    <Container>
      <ZoomArea>
        <img src={src} alt="aaa"/>
      </ZoomArea>
    </Container>
  )
}

export default Test
