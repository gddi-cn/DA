import { Form, RadioChangeEvent } from 'antd'
import React from 'react'

export const useDateSelect = () => {
  const [form] = Form.useForm<{ day: number, custom?: number }>()
  const [disabled, setDisabled] = React.useState<boolean>(true)

  const handleChange = (e: RadioChangeEvent) => {
    setDisabled(e.target.value !== 0)
  }

  React.useEffect(
    () => {
      if (!disabled) return

      form.validateFields(['custom'])

      form.setFieldsValue({ custom: undefined })
    },
    [disabled]
  )

  React.useEffect(
    () => {
      return () => {
        form.resetFields()
        setDisabled(true)
      }
    },
    []
  )

  return {
    form,
    handleChange,
    disabled,
  }
}