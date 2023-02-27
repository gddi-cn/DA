import { EditOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { Modal, Input, message } from 'antd'
import { ChangeEvent, useRef, useState } from 'react'
import { isNil } from 'lodash'
import { modifyActiveTask } from '@reducer/tasksSilce'
import styled from 'styled-components'
import {ExclamationCircleOutlined} from "@ant-design/icons";

import './TaskNameBar.module.less'
import { socketPushMsgForProject } from '@src/views/ghooks'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { useHeader } from '@src/hooks/header'

const EditICon = styled(EditOutlined)`
  path {
    fill: #62B0E5;
  }
`

const Footer = styled.div`
  display: felx;
  justify-content: space-between;
  align-items: center;
`

const FooterRight = styled.div`
  display: felx;
  align-items: center;
  column-gap: 10px;
`

const TaskNameBar = (): JSX.Element => {
  const task_name = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo?.name
  })
  const reactKey = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo?.id
  })
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const taskName = useRef<undefined|string|null>(undefined)

  const { deleteCurrentProject } = useHeader()
  
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine
  })

  const handleModifyTaskName = () => {
    setIsModalVisible(true)
  }
  const handleOk = async () => {
    if (isNil(taskName.current)) {
      message.warning('请输入任务名')
      return
    }
    setLoading(true)
    const loading = new Promise(function (resolve) {
      setTimeout(resolve, 500)
    })
    const setTaskname = new Promise(function (resolve, reject) {
      //
      try {
        dispatch(modifyActiveTask({ id: reactKey, params: { name: taskName.current } }))
        activePipeLine && socketPushMsgForProject(activePipeLine, {
          taskNameChanged: 1,
        })
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })

    await Promise.allSettled([
      loading, setTaskname
    ])
    setLoading(false)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    if (loading) return
    setIsModalVisible(false);
  };

  const handleOnchange = (v: ChangeEvent<HTMLInputElement>) => {
    taskName.current = v.target.value
  }

  const handleDelete = () => {
    if (loading || deleting) return

    setIsModalVisible(false)

    Modal.confirm({
      title: '删除任务',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，是否确定删除？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => setIsModalVisible(true),
      onOk: async () => {
        setDeleting(true)

        const success = await deleteCurrentProject()

        setDeleting(false)

        if (!success) return

        message.success('删除成功')
      },
    });
  }

  return (
    <div styleName='TaskNameBar'>
      <div className='edit_icon_wrap' >
        <EditICon onClick={handleModifyTaskName} />
        <Modal
          destroyOnClose
          title="修改训练基础信息"
          open={isModalVisible}
          onCancel={handleCancel}
          closable={false}
          footer={
            <Footer>
              <SecondaryBtn
                color='error'
                onClick={handleDelete}
                disabled={loading}
                loading={deleting}
              >
                删除
              </SecondaryBtn>
              <FooterRight>
                <SecondaryBtn onClick={handleCancel} disabled={loading}>
                  取消
                </SecondaryBtn>
                <PrimaryBtn onClick={handleOk} loading={loading}>
                  确定
                </PrimaryBtn>
              </FooterRight>
            </Footer>
          }
        >
          <Input maxLength={20} onChange={handleOnchange} defaultValue={task_name} />
          <p className='ant_moddl_tips'>最多20个字符</p>
        </Modal>
      </div>
      {task_name || '未命名'}

    </div>
  )
}

export default TaskNameBar
