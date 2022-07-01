
import { Button, Form, Input } from 'antd';
import { UploadFile } from '@src/UIComponents'
import './DatasetBaseInfoForm.module.less'

const DatasetBaseInfoForm = (): JSX.Element => {
  const [form] = Form.useForm();

  const handleNext = async () => {
    const data = await form.validateFields()
    console.log(data)
  }
  return (
    <div styleName='DatasetBaseInfoForm'>
      <Form form={form} name="control-hooks" >
        <Form.Item
          name="note"
          label="Note"
          rules={[
            { required: true }]
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="file"
          label="文件啊"
          valuePropName='file'
          rules={
            [
              { required: true },
              () => ({
                validator (rule, value) {
                  console.log(value)
                  if (value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致！'));
                },
              }),

            ]

          }
        >
          <UploadFile >
            children=上传啦
          </UploadFile>
        </Form.Item>
      </Form>
      <Button onClick={handleNext}>下一步</Button>
    </div>
  )
}

export default DatasetBaseInfoForm
