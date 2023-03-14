import { SmallButton, UploadFile } from '@src/UIComponents'
import { useState } from 'react'
import { message, Modal, Input, Form, Button } from 'antd'

import api from '@api'

import './EditDataset.module.less'
import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { Dataset } from '@src/shared/types/dataset'

const maxSize = 2 * 1024 * 1024

const regExp = /\.(png|jpg|jpeg)$/

type Props={
  type: 'nomal' | 'delete' | 'primary',
  callback?: ()=>void,
  eleId:string,
  dataset: Data | Dataset | null
}

const EditDataset = (props: Props): JSX.Element => {
  const { callback, eleId, type, dataset: data } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm();

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
      if (!data?.id) return
      const row = (await form.validateFields()) as any;
      const res: any = await api.patch(`/v3/datasets/${data?.id}`, row)
      if (res.code === 0) {
        setVisible(false)

        message.success('修改成功。')
        // fetchData({ isInit: true })
        callback && callback()
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  return (
    <div styleName='EditDataset' id='modal_wrap'>
      <SmallButton type={type} className='Operation_edit' onClick={() => setVisible(true)}>编辑</SmallButton>
      <Modal
        title={
          <div className='modal_title'>
            修改数据集信息
          </div>
        }
        open={visible}
        // onOk={handleIgOk}
        getContainer={document.getElementById(eleId || 'modal_wrap') as any}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        forceRender={false}
        className='modify_dataset_info'
        closable={false}
      >
        <Form
          form={form}
          name='basic'
          initialValues={{ remember: true }}
          labelCol={{ span: 6 }}
          // onFinish={onFinish}
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
          >
            <UploadFile tips='支持.jpg .jpeg .png 等图片文件，文件不得大于2MB' hasPreview={true} maxSize={maxSize} regExp={regExp} />
          </Form.Item>

          <div className='btn_wrap'>
            <Button type='default' className='cansel_btn' onClick={() => setVisible(false)}>
                取消
            </Button>
            <Button type='primary' htmlType='submit' onClick={onFinish}>
                提交
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default EditDataset
