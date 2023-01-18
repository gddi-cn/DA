import React from 'react'
import styled from 'styled-components'

import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import Dialog from '@src/components/Dialog'
import { useUnregister } from '../hook'
import unregister from '@src/asset/images/space/unregister.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 196px;
`

const Img = styled.img`
  display: block;
  width: 357px;
  height: 200px;
  object-fit: contain;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #FF6177;
  margin-top: 40px;
`

const Tip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 10px;
`

const Footer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 40px;
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`

const Unregister: React.FC = () => {
  const { open, loading, handleOpen, handleClose, handleUnregister } = useUnregister()

  return (
    <>
      <SecondaryBtn color='error' width={132} onClick={handleOpen}>
        注销
      </SecondaryBtn>
      <Dialog
        open={open}
        onCancel={handleClose}
        width={1400}
        title='注销设备'
      >
        <Container>
          <Img src={unregister} alt={'unregister'} />
          <Title>注销设备</Title>
          <Tip>设备注销后将无法撤销，您确定要注销吗？</Tip>
          <Footer>
            <SecondaryBtn width={97} onClick={handleClose}>取消</SecondaryBtn>
            <PrimaryBtn width={97} onClick={handleUnregister} loading={loading}>确定</PrimaryBtn>
          </Footer>
        </Container>
      </Dialog>
    </>
  )
}

export default Unregister
