import React from 'react'
import { FormInstance } from 'antd'
import styled from 'styled-components'
import { useAction } from './hook'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
  display: flex;
  justify-content: flex-end;
`

const DaySelectFooter: React.FC<{ form: FormInstance<{ day: number, custom?: number }> }> = (
  {
    form,
  }
) => {
  const { handleSubmit, handleCancel } = useAction(form)

  return (
    <Container>
      <SecondaryBtn width={97} onClick={handleCancel}>返回</SecondaryBtn>
      <div style={{ marginLeft: 20 }}>
        <PrimaryBtn width={97} onClick={handleSubmit}>确定</PrimaryBtn>
      </div>
    </Container>
  )
}

export default DaySelectFooter
