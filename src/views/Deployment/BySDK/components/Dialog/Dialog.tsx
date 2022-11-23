import React from 'react'
import { Modal as AntdModal, Button as AntdButton, ModalProps } from 'antd'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'

const Modal = styled(AntdModal)`
  .ant-modal-content {
    box-sizing: content-box;
    background-color: #edf8ff;
    border: 2px solid #62b0e5;
    border-radius: 12px;
    position: relative;
    .ant-modal-body {
      padding: 40px 0;
      overflow: hidden;
    }
  }
`

const CloseButton = styled(AntdButton)`
  background-color: transparent;
  border: none;
  color: #2582c1;
  box-shadow: none;
  position: absolute;
  top: 24px;
  right: 45px;
  &:hover, &:focus {
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
  &::after {
    display: none;
  }
`

const Content = styled.div`
  overflow-y: auto;
  min-height: 600px;
  max-height: calc(98vh - 100px);
  padding: 0 40px;
`

interface DialogProps extends ModalProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

const Dialog: React.FC<DialogProps> = (
  {
    open,
    onClose,
    children,
    ...props
  }
) => {

  return (
    <Modal
      visible={open}
      footer={null}
      closable={false}
      centered
      width={1400}
      {...props}
    >
      <CloseButton
        shape={'circle'}
        icon={(
          <CloseOutlined style={{ fontSize: 16 }} onClick={onClose} />
        )}
      />
      <Content>
        { children }
      </Content>
    </Modal>
  )
}

export default Dialog
