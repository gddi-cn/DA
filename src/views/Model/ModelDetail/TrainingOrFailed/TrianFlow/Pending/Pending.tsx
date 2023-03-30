import React from 'react'
import styled from 'styled-components'
import Loading from "@src/components/Loading";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  display: block;
  height: 50%;
  width: 50%;
  object-fit: contain;
`

const Pending: React.FC = () => {
  return (
    <Container>
      {/*<Img src={waiting} />*/}
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 32, alignItems: 'center' }}>
        <Loading />
        <p style={{ fontSize: 24, color: '#48A2DF' }}>等待资源释放，训练排队中</p>
      </div>
    </Container>
  )
}

export default Pending
