import appAPI from '@src/apis/app'
import s3API from '@src/apis/s3'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { message } from 'antd'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { baseFormAtom, baseFormValueAtom, creatingAtom, currentStepAtom, openAtom, pipelineAtom } from './store'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 40px 20px;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

export interface FooterProps {
  onCancel?: () => void
  onCreate?: () => void
}

const useFooter = (onCreate?: () => void, onCancel?: () => void) => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const [loading, setLoading] = useAtom(creatingAtom)
  const [form] = useAtom(baseFormAtom)
  const [formValue, setFormValue] = useAtom(baseFormValueAtom)
  const [formLoading, setFormLoading] = React.useState<boolean>(false)
  const pipeline = useAtomValue(pipelineAtom)
  const disabledCreate = !pipeline
  const setOpen = useSetAtom(openAtom)

  const base = currentStep === 'base'

  const handleCancel = () => {
    onCancel && onCancel()
  }

  const handleNext = async () => {
    if (currentStep === 'config') return

    if (!form || formLoading) return

    setFormLoading(true)
    try {
      const baseFormValue = await form.validateFields()
      setFormLoading(false)
      setFormValue(baseFormValue)
      setCurrentStep('config')
    } catch (e) {
      setFormLoading(false)
      return
    }
  }

  const handlePre = () => {
    if (currentStep === 'base') return

    setCurrentStep('base')
  }

  const handleCreate = async () => {
    if (disabledCreate || !pipeline || !formValue) return

    const module_version = pipeline.version

    const config = JSON.stringify(pipeline)
    const { name, cover: coverFileList, description } = formValue

    const coverFile = (coverFileList || [])[0]

    setLoading(true)
    let cover: string | undefined

    if (coverFile) {
      const { success, data } = await s3API.uploadFile(coverFile)

      if (success && data)
        cover = data
    }
    const { success } = await appAPI.createTemplate({
      name,
      cover,
      description,
      config,
      module_version,
    })
    setLoading(false)
    onCreate && onCreate()

    if (!success) return

    message.success("创建成功")
    setOpen(false)
  }

  return {
    base,
    loading,
    disabledCreate,
    formLoading,
    handleCancel,
    handleNext,
    handlePre,
    handleCreate,
  }
}

const Footer: React.FC<FooterProps> = (
  {
    onCreate,
    onCancel,
  }
) => {
  const {
    base,
    loading,
    disabledCreate,
    formLoading,
    handleCancel,
    handleNext,
    handlePre,
    handleCreate,
  } = useFooter(onCreate, onCancel)

  return (
    <Container>
      <SecondaryBtn width={97} onClick={handleCancel}>取消</SecondaryBtn>
      <FooterRight>
        {
          base ? (
            <PrimaryBtn loading={formLoading} width={97} onClick={handleNext}>下一步</PrimaryBtn>
          ) : (
            <>
              <SecondaryBtn width={97} onClick={handlePre}>上一步</SecondaryBtn>
              <PrimaryBtn disabled={disabledCreate} width={97} onClick={handleCreate} loading={loading}>创建</PrimaryBtn>
            </>
          )
        }
      </FooterRight>
    </Container>
  )
}

export default Footer

