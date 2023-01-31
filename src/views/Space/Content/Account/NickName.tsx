import React from 'react'
import styled from 'styled-components'
import { Button, Input, Tooltip } from 'antd'

import { useUserName } from './hook'
import { ReactComponent as EditIcon } from '@src/asset/icons/space/edit.svg'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

const Container = styled.div`
  height: 32px;
  width: 100%;
  display: flex;
  column-gap: 20px;
  align-items: center;
`

const Label = styled.p`
  width: 45px;
  text-align: justify;
  text-align-last: justify;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #202223;
`

const Content = styled.div`
  flex-grow: 1;
`

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Text = styled.p`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #202223;
`

const EditWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
`

const NickName: React.FC = () => {
  const {
    nickName, editing, handleEdit,
    inputValue, handleNameChange,
    handleCancel, handleUpdate, loading,
  } = useUserName()

  return (
    <Container>
      <Label>昵称</Label>
      <Content>
        {
          editing ? (
            <EditWrap>
              <Input autoFocus placeholder='请输入昵称' value={inputValue} onChange={handleNameChange} />
              <PrimaryBtn loading={loading} onClick={handleUpdate}>确定</PrimaryBtn>
              <SecondaryBtn onClick={handleCancel}>取消</SecondaryBtn>
            </EditWrap>
          ) : (
            <TextWrap>
              <Text>{nickName || '暂无'}</Text>
              <Tooltip title='编辑'>
                <Button type={'link'} onClick={handleEdit}>
                  <EditIcon />
                </Button>
              </Tooltip>
            </TextWrap>
          )
        }
      </Content>
    </Container>
  )
}

export default NickName
