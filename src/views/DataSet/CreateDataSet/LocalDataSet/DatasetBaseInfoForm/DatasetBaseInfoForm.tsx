
import { Button, Form, Input } from 'antd';
import { UploadFile } from '@src/UIComponents'
import { bytesToSize } from '@src/utils'
import { isNil } from 'lodash';
import './DatasetBaseInfoForm.module.less'

const { TextArea } = Input;
const maxSize = 2 * 1024 * 1024

const regExp = /\.(png|jpg|jpeg)$/
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
          label="名字"
          rules={[
            { required: true }]
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="des"
          label="备注"
          rules={[
            { required: true }]
          }
        >
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="file"
          label="文件啊"
          valuePropName='file'
          rules={
            [
              { required: true },
              () => ({
                validator (rule, file) {
                  console.log(file)
                  if (isNil(file)) {
                    return Promise.resolve();
                  }
                  const { size } = file
                  if (size > maxSize) {
                    return Promise.reject(new Error(`文件不能大于${bytesToSize(maxSize)}`));
                  }
                },
              }),
              () => ({
                validator (rule, file) {
                  console.log(file)
                  if (isNil(file)) {
                    return Promise.resolve();
                  }
                  const { name } = file
                  if (!regExp?.test(name)) {
                    const suffix = name.match(/\.(\w)*$/)
                    if (suffix) {
                      return Promise.reject(new Error(`不支持${suffix[0]}文件类型`))
                    } else {
                      return Promise.reject(new Error('不支持该类型文件'))
                    }
                  }
                },
              }),
            ]

          }
        >
          <UploadFile hasPreview={true} >
            children=上传啦
          </UploadFile>
        </Form.Item>
      </Form>
      <Button onClick={handleNext}>下一步</Button>
    </div>
  )
}

export default DatasetBaseInfoForm
