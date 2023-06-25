import React from 'react'
import styled from 'styled-components'
import { Form as AntForm, Input, Select, Upload } from 'antd'
import { ReactComponent as UploadIcon } from '@src/asset/icons/upload-cloud.svg'
import { RcFile } from 'antd/es/upload'
import { getBase64 } from '@src/utils'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { useAtom, useAtomValue } from 'jotai'
import { baseFormAtom, baseFormValueAtom } from './store'

const Container = styled.div`
  padding-top: 40px;
`

const Uploader = styled(Upload.Dragger)`
  .ant-upload {
    background-color: #fff;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: center;
`

const Form = styled(AntForm)`
  width: 436px;
`

const PreviewImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const maxSize = 2 * 1024 * 1024
const regExp = /\.(png|jpg|jpeg)$/

const useBaseForm = () => {
  const [form] = Form.useForm<Template.Create.Form>()
  const formValue = useAtomValue(baseFormValueAtom)
  const [, setForm] = useAtom(baseFormAtom)

  const [showUploadBtn, setShowUploadBtn] = React.useState<boolean>(true)
  const [previewTitle, setPreviewTitle] = React.useState<string>('')
  const [previewSrc, setPreviewSrc] = React.useState<string | undefined>(undefined)

  async function handleCoverChange<T>(info: UploadChangeParam<UploadFile<T>>) {
    if (!info.fileList?.length) {
      setShowUploadBtn(true)
      setPreviewSrc(undefined)
      setPreviewTitle('')
      return
    }

    setShowUploadBtn(false)
    setPreviewSrc(await getBase64(info.file as RcFile))
    setPreviewTitle(info.file.name)
  }

  React.useEffect(
    () => {
      if (!formValue) return

      form.setFieldsValue(formValue)

      const coverList = formValue.cover

      if (!coverList?.length) return

      const cover = (coverList[0] as UploadFile).originFileObj
      if (!cover) return

      getBase64(cover)
        .then((previewSrc) => {
          setShowUploadBtn(false)
          setPreviewSrc(previewSrc)
          setPreviewTitle(cover.name)
        })

    },
    []
  )

  React.useEffect(
    () => {
      setForm(form)
    },
    []
  )

  return {
    form,
    handleCoverChange,
    showUploadBtn,
    previewSrc,
    previewTitle,
  }
}

const BaseForm: React.FC = () => {
  const {
    form,
    handleCoverChange,
    showUploadBtn,
    previewSrc,
    previewTitle,
  } = useBaseForm()

  return (
    <Container>
      <Content>
        <Form form={form} layout={'vertical'} preserve={false}>
          <Form.Item
            name={'name'}
            required
            label={'模板名称'}
            rules={[
              { required: true, message: '请输入模板名称' }
            ]}
          >
            <Input autoFocus autoComplete={'off'} tabIndex={1} />
          </Form.Item>
          <Form.Item
            name={'description'}
            label={'描述'}
          >
            <Input.TextArea tabIndex={2} />
          </Form.Item>
          <Form.Item
            name={'cover'}
            label={'封面'}
            rules={[
              () => ({
                validator(_, value) {
                  if (!value?.length) return Promise.resolve()

                  const [file] = value

                  if (!file) return Promise.resolve()

                  const namePass = regExp.test(file.name.toLowerCase())
                  const suffix = file.name.match(/\.(\w)*$/)

                  if (!namePass)
                    return Promise.reject(`不支持 ${suffix ? suffix[0] : '该'} 类型文件`)

                  const sizePass = file.size <= maxSize

                  if (!sizePass)
                    return Promise.reject('文件大小不能超过 2 MB')

                  return Promise.resolve()
                }
              }),
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e
              }
              return e && e.fileList
            }}
          >
            <Uploader
              onChange={handleCoverChange}
              accept='image/jpg, image/jpeg, image/png'
              multiple={false} beforeUpload={() => false}
              isImageUrl={() => true} maxCount={1}
            >
              {
                showUploadBtn ? (
                  <>
                    <p className="ant-upload-drag-icon">
                      <UploadIcon />
                    </p>
                    <p className="ant-upload-text">
                      将文件拖到此处，或点击上传
                    </p>
                    <p className="ant-upload-hint">
                      支持 .jpg .jpeg .png 等图片文件，文件不能大于 2 MB
                    </p>
                  </>
                ) : (
                  <PreviewImg src={previewSrc} alt={previewTitle} />
                )
              }
            </Uploader>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  )
}

export default BaseForm

