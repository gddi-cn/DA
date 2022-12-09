import React from 'react'
import styled from 'styled-components'
import { Button, Modal as AntModal } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const Modal = styled(AntModal)`
  height: 100vh;
  width: 100vw!important;
  top: 0;
  padding: 0;
  margin: 0;
  max-width: unset;
  .ant-modal-content {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    background: unset;
    .ant-modal-body {
      padding: 0;
      height: 100%;
      position: relative;
    }
  }
`

const CloseWrap = styled.div`
  position: absolute;
  right: 24px;
  top: 12px;
`

const CloseIcon = styled(CloseOutlined)`
  font-size: 35px!important;
`

interface FullScreenModalProps {
  open: boolean
  onClose(): void
  children?: React.ReactNode
}

const FullScreenModal: React.FC<FullScreenModalProps> = (
  {
    open,
    onClose,
    children,
  }
) => {

  return (
    <Modal
      open={open}
      destroyOnClose
      title={null}
      closable={false}
      footer={null}
      onCancel={onClose}
    >
      {children}
      <CloseWrap>
        <Button
          title={'关闭'} type={'link'}
          icon={<CloseIcon />}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        />
      </CloseWrap>
    </Modal>
  )
}

export default FullScreenModal
