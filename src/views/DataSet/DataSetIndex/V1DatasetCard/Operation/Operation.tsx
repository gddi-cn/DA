import { SmallButton } from '@src/UIComponents'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { FectData } from '../../DatasetList/DatasetList'
import api from '@api'
import EditDataset from '../EditDataset'
import { APP_DATASET_DETAIL } from '@router'
import { useNavigate } from 'react-router-dom'
import type { Data } from '../V1DatasetCard'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './Operation.module.less'

type Props={
    setLoading: Dispatch<SetStateAction<boolean>>,
    data: Data,
    fetchData: (info: FectData) => void,
    onlyShowDelete?:boolean
}

function Operation (props: Props): JSX.Element {
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const { setLoading, fetchData, data, onlyShowDelete } = props

  const navigate = useNavigate()
  const deleteDataset = async () => {
    setLoading(true)
    const res = await api.delete(`/v3/datasets/${data?.id}`);
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

  const handleGotoDetail = useCallback(
    () => {
      navigate({
        pathname: APP_DATASET_DETAIL,
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL,
        APP_DATASET_DETAIL: { id: data?.id },
        APP_DATA_SET_INDEX: data,
      })
    }, [activePipeLine, data, navigate]
  )

  const renderContent = () => {
    if (onlyShowDelete) {
      return (
        <SmallButton type='delete' onClick={handleDelete}>删除</SmallButton>
      )
    }

    if (data.is_public) {
      return (
        <SmallButton type="nomal" onClick={handleGotoDetail}>查看</SmallButton>
      )
    }

    return (
      <>
        <SmallButton type="nomal" onClick={handleGotoDetail}>查看</SmallButton>
        <EditDataset
          callback={() => { fetchData({ isInit: true }) }}
          type='primary'
          eleId='DataSetIndex'
          dataset={data}
        />
        <SmallButton type='delete' onClick={handleDelete}>删除</SmallButton>
      </>
    )
  }

  return (
    <div styleName='Operation' onClick={handlePrevent}>

      {renderContent()}

    </div>
  )
}

export default Operation
