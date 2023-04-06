import React from 'react'

import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { useProcess } from './hook'
import Dialog from '@src/components/Dialog'
import styled from 'styled-components'
import { InputNumber } from 'antd'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0 0;
  row-gap: 40px;
`

const Label = styled.label`
  
`

const Content = styled.div`
  display: flex;
  justify-content: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
  column-gap: 16px;
`

const Process: React.FC = () => {
  const {
    process,
    open,
    handleCancel,
    handleChange,
    handleUpdate,
    handleOpen,
    loading,
  } = useProcess()
  return (
    <>
      <SecondaryBtn width={132} onClick={handleOpen}>修改任务数限制</SecondaryBtn>
      <Dialog
        open={open}
        onCancel={handleCancel}
        centered={false}
        title={'修改任务最大并发数限制'}
        width={600}
        pb={'0px'}
      >
        <Container>
          <Content>
            <Label>
              <span>最大并发数：</span>
              <InputNumber<number>
                value={process}
                onChange={handleChange}
                min={1}
                max={999}
                style={{ width: 300 }}
                autoFocus
              />
            </Label>
          </Content>
          <Footer>
            <SecondaryBtn width={97} onClick={handleCancel} disabled={loading}>取消</SecondaryBtn>
            <PrimaryBtn width={97} onClick={handleUpdate} loading={loading}>修改</PrimaryBtn>
          </Footer>
        </Container>
      </Dialog>
    </>
  )
}

export default Process

