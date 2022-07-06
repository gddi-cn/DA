import { SmallButton, UploadFile } from '@src/UIComponents'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { message, Modal, Input, Form, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { FectData } from '../../DatasetList/DatasetList'
import api from '@api'
import { bytesToSize } from '@src/utils'
// import { isNil } from 'lodash';
import type { Data } from '../V1DatasetCard'
import './Operation.module.less'
import { isEmpty, isString, isNil } from 'lodash'

type Props={
    setLoading: Dispatch<SetStateAction<boolean>>,
    data: Data,
    fetchData: (info: FectData) => void
}

const maxSize = 2 * 1024 * 1024

const regExp = /\.(png|jpg|jpeg)$/

function Operation (props: Props): JSX.Element {
  const { setLoading, fetchData, data } = props

  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm();

  const deleteDataset = async () => {
    setLoading(true)
    const res = await api.delete(`/v2/datasets/${data?.id}`);
    if (res.code === 0) {
      setLoading(false)
      fetchData({ isInit: true })
      message.success('删除成功。')
    }
    return Promise.resolve()
  }

  const handleDelete = () => {
    Modal.confirm({
      title: '删除数据集',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，是否确定删除？',

      onOk () {
        return deleteDataset()
      },
      onCancel () {
        console.log('Cancel');
        return Promise.resolve()
      },
    });
  }

  const handlePrevent = (evt:React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  const ModalForm = useMemo(
    () => {
      const handleCancel = () => {
        setVisible(false)
        form.setFieldsValue({
          name: undefined,
          summary: undefined,
          cover: undefined
        })
      }

      const onFinish = async (values: any) => {
        console.log(values)
        try {
          const row = (await form.validateFields()) as any;
          // editDataset(id, row, setVisible)
          console.warn(row, 'rowrowrow')
          const { cover } = row
          if (!isString(cover)) {
            const { name, size } = cover
            const ossUrl = await api.get('/v2/file/upload', { params: { filename: name, size } })
            if (ossUrl.code === 0) {
              const { file_url: fileUrl, header, method, url } = ossUrl.data
              const methodAxios: any = String(method).toLocaleLowerCase()

              const uploadAws = await (api as any)[methodAxios](url, cover, { headers: header })

              if (uploadAws.code === 0) {
                message.success('上传图片成功')
                row.cover = fileUrl
              }
            }
          }
          const res: any = await api.patch(`/v2/datasets/${data?.id}`, row)
          if (res.code === 0) {
            setVisible(false)

            message.success('修改成功。')
            fetchData({ isInit: true })
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };

      return (
        <Modal
          title='修改数据集名字'
          visible={visible}
          // onOk={handleIgOk}
          getContainer={document.getElementById('DataSetIndex') as any}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose={true}
          forceRender={false}
        >
          <Form
            form={form}
            name='basic'
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            className='modify_dataset_info'
          >
            <Form.Item
              label='数据集名'
              name='name'
              rules={[{ required: true }]}
              initialValue={data?.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='描述'
              name='summary'
              initialValue={data?.summary}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            {/* <Form.Item
            label='是否公开'
            name='is_public'
            initialValue={isp}
            valuePropName='checked'
          >
            <Switch />
          </Form.Item> */}

            <Form.Item
              label='数据集封面'
              name='cover'
              initialValue={data?.cover}
              rules={
                [

                  () => ({
                    validator (rule, file) {
                      if (isNil(file)) {
                        return Promise.resolve();
                      }
                      const { size } = file
                      if (size > maxSize) {
                        return Promise.reject(new Error(`文件不能大于${bytesToSize(maxSize)}`));
                      }
                      return Promise.resolve();
                    },
                  }),
                  () => ({
                    validator (rule, file) {
                      if (isNil(file)) {
                        return Promise.resolve();
                      }
                      const { name } = file
                      if (!isEmpty(name)) {
                        if (!regExp?.test(name)) {
                          const suffix = name.match(/\.(\w)*$/)
                          if (suffix) {
                            return Promise.reject(new Error(`不支持${suffix[0]}文件类型`))
                          } else {
                            return Promise.reject(new Error('不支持该类型文件'))
                          }
                        }
                      }

                      return Promise.resolve();
                    },
                  }),
                ]

              }
            >
              <UploadFile tips='支持.jpg .jpeg .png 等图片文件,文件不得大于2MB' hasPreview={true} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
              <Button type='primary' htmlType='submit' onClick={onFinish}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )
    }, [data, fetchData, form, visible]
  )

  return (
    <div styleName='Operation' onClick={handlePrevent}>
      <SmallButton type='primary' className='Operation_edit' onClick={() => setVisible(true)}>编辑</SmallButton>
      <SmallButton type='delete' onClick={handleDelete}>删除</SmallButton>
      {ModalForm}
    </div>
  )
}

export default Operation
