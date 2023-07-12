import React, { cloneElement } from 'react'
import styled from 'styled-components'
import { Form, Input } from 'antd'
import { useAtom, useSetAtom } from 'jotai'

import { FooterBar, UploadFile } from '@src/UIComponents'
import { useBack2DatasetIndex } from '@src/hooks/task'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Btn'
import { baseFormAtom, currentStepAtom } from '../store'
import { EMarked } from '../enums'

const { TextArea } = Input;
const maxSize = 2 * 1024 * 1024
const regExp = /\.(png|jpg|jpeg)$/

const Container = styled.div`
  height: calc(100vh - 186px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const FormWrap = styled.div`
  flex: 1;
  width: 450px;
  margin: 0 auto;
  padding-top: 40px;
`

type AmazingWrapProps = {
  Component: any,
  cusTips: string
}

const AmazingWrap = (props: AmazingWrapProps) => {
  const { Component, cusTips, ...rset } = props
  return (
    <div>
      {
        cloneElement(Component, {
          ...rset
        })
      }
      <p className='Amazing_text'>{cusTips}</p>
    </div>
  )
}

const RightActionsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

const useBaseForm = () => {
  const [form] = Form.useForm<Marked.BaseForm>()
  const [initialValues, setFormValues] = useAtom(baseFormAtom)
  const setCurrentStep = useSetAtom(currentStepAtom)

  const handleNext = async () => {
    try {
      const values = await form.validateFields()
      setFormValues(values)
      setCurrentStep(EMarked.Step.SELECT_DATASET)
    } catch(e) {
      console.error(e)
    }
  }

  const handlePrev = () => {
    setFormValues(form.getFieldsValue())
    setTimeout(() => {
      setCurrentStep(EMarked.Step.SELECT_TRAIN_TYPE)
    })
  }

  return {
    form,
    initialValues,
    handleNext,
    handlePrev,
  }
}

const LeftActions: React.FC = () => {
  const handleCancel = useBack2DatasetIndex()

  return (
    <SecondaryBtn onClick={handleCancel}>取消</SecondaryBtn>
  )
}

const RightActions: React.FC<{ onNext: () => void, onPrev: () => void }> = (
  {
    onPrev,
    onNext,
  }
) => {
  return (
    <RightActionsContainer>
      <SecondaryBtn onClick={onPrev}>上一步</SecondaryBtn>
      <PrimaryBtn onClick={onNext}>下一步</PrimaryBtn>
    </RightActionsContainer>
  )
}

const BaseForm: React.FC = () => {
  const {
    form,
    initialValues,
    handleNext,
    handlePrev,
  } = useBaseForm()
  
  return (
    <Container>
      <FormWrap>
        <Form
          form={form}
          initialValues={initialValues}
          className='form_wrap'
          labelCol={{ span: 5 }}
        >
          <Form.Item
            name="name"
            label="数据名称"
            rules={
              [
                { required: true },
              ]
            }
          >
            <AmazingWrap
              cusTips='最多20个字符'
              Component={<Input autoFocus maxLength={20} />}
            />
          </Form.Item>

          <Form.Item
            name="summary"
            label="备注"
          >

            <AmazingWrap
              cusTips='最多100个字符'
              Component={(
                <TextArea rows={4} placeholder="" maxLength={100} />
              )}
            />
          </Form.Item>

          <Form.Item
            name="cover"
            label="数据集封面"
          >
            <UploadFile
              hasPreview={true}
              tips="支持.jpg .jpeg .png 等图片文件，文件不得大于2MB"
              maxSize={maxSize}
              regExp={regExp}
            />
          </Form.Item>
        </Form>
      </FormWrap>
      <FooterBar
        leftContent={<LeftActions />}
        rightContent={(
          <RightActions
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      />
    </Container>
  )
}

export default BaseForm
