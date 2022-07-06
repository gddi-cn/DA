import { SmallButton } from '@src/UIComponents'
import { Dispatch, SetStateAction } from 'react'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { FectData } from '../../DatasetList/DatasetList'
import api from '@api'
import EditDataset from '../EditDataset'
// import { isNil } from 'lodash';
import type { Data } from '../V1DatasetCard'
import './Operation.module.less'

type Props={
    setLoading: Dispatch<SetStateAction<boolean>>,
    data: Data,
    fetchData: (info: FectData) => void
}

function Operation (props: Props): JSX.Element {
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
        return Promise.resolve()
      },
    });
  }

  const handlePrevent = (evt:React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  return (
    <div styleName='Operation' onClick={handlePrevent}>
      <EditDataset data={data} callback={() => { fetchData({ isInit: true }) }} type='primary' eleId='DataSetIndex' />
      <SmallButton type='delete' onClick={handleDelete}>删除</SmallButton>

    </div>
  )
}

export default Operation
