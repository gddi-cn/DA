import React from 'react'
import styled from 'styled-components'
import { useDateSelect } from './hook'
import { Form, FormInstance, InputNumber, Radio, Space } from 'antd'

import bg from './bg.png'

interface DaySelectProps {
  Footer: React.FC<{ form: FormInstance<{ day: number, custom?: number }> }>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`

const Img = styled.img`
  object-fit: contain;
  display: block;
  width: 254px;
  height: 200px;
`

const dayList = [7, 14, -1, 0]
const labelList = ['7 天', '14 天', '永久', '自定义']

const DaySelect: React.FC<DaySelectProps> = (
  {
    Footer,
  }
) => {
  const { form, disabled, handleChange } = useDateSelect()

  return (
    <>
      <Container>
        <Form form={form} layout={'vertical'} style={{ width: 255 }}>
          <Form.Item
            name={'day'}
            label={'授权天数'}
            required
            initialValue={7}
            rules={[
              { required: true, message: '请选择授权天数' }
            ]}
          >
            <Radio.Group onChange={handleChange}>
              <Space direction={'vertical'}>
                {
                  dayList.map((day, idx) => (
                    <Radio key={day} value={day}>{labelList[idx]}</Radio>
                  ))
                }
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={'custom'}
            style={{ paddingLeft: 22 }}
            label={''}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('day') === 0 && !value) {
                    return Promise.reject('请输入授权天数')
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <InputNumber
              addonAfter={'天'}
              disabled={disabled}
              min={1}
              placeholder={'请输入天数'}
              autoComplete={'off'}
              precision={0}
            />
          </Form.Item>
        </Form>
        <Img alt={'bg'} src={bg} />
      </Container>
      <Footer form={form} />
    </>
  )
}

export default DaySelect
