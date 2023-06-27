import { Form, RadioChangeEvent } from 'antd'
import React from 'react'
import { DaySelectorRef } from './DaySelector'

export const useDateSelector = (
  ref: React.ForwardedRef<DaySelectorRef>
) => {
  const [form] = Form.useForm<{ day: number, custom?: number }>()
  const [disabled, setDisabled] = React.useState<boolean>(true)

  const handleChange = (e: RadioChangeEvent) => {
    setDisabled(e.target.value !== 0)
  }

  React.useImperativeHandle(ref, () => ({
    form,
  }))

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
      setTimeout(
        () => form.setFieldValue('custom', 30),
        500
      )
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
