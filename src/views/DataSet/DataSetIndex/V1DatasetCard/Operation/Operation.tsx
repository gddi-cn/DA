import { SmallButton } from '@src/UIComponents'
import type { Dispatch, SetStateAction } from 'react'
import { Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { FectData } from '../../DatasetList/DatasetList'
import api from '@api'
import './Operation.module.less'

type Props<T>={
    setLoading: Dispatch<SetStateAction<boolean>>,
    data:T,
    fetchData: (info: FectData) => void
}

function Operation<T extends {id:string}> (props: Props<T>): JSX.Element {
  const { setLoading, fetchData, data } = props

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
  return (
    <div styleName='Operation'>
      <SmallButton type='primary' className='Operation_edit'>编辑</SmallButton>
      <SmallButton type='delete' onClick={handleDelete}>删除</SmallButton>
    </div>
  )
}

export default Operation
