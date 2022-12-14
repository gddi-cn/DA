import { FooterBar, GButton } from '@src/UIComponents'
import { useMemo, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { MODEL_TYPES, SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_CREATE_TYPE, APP_LOCAL_FILE_STEP_2 } from '@router'
import { message } from 'antd'
import { useAtom } from 'jotai'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import './SelectTrainType.module.less'

import TrainTypeItem from './TrainTypeItem'
import { activeTypeAtom } from './store'
import { DatasetScene } from '@src/shared/enum/dataset'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 186px);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const List = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template: auto / repeat(3, 1fr);
  gap: 20px;
`

const SelectTrainType = (): JSX.Element => {
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const navigate = useNavigate()
  const [activeType, setActiveType] = useAtom(activeTypeAtom)

  useEffect(() => {
    if (activePipeLine.APP_LOCAL_FILE_STEP_1) {
      const { activeType } = activePipeLine.APP_LOCAL_FILE_STEP_1
      setActiveType(activeType)
    }
  }, [activePipeLine])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_DATASET_CREATE_TYPE
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_CREATE_TYPE
      })
    }

    const goNext = () => {
      if (isEmpty(activeType)) {
        message.warning('请选择数据类型')
      }
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next
      navigate({
        pathname: APP_LOCAL_FILE_STEP_2
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_LOCAL_FILE_STEP_2,
      })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton className={isEmpty(activeType) ? 'not_allow' : 'yes_sir'} style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [activeType, navigate, activePipeLine])

  return (
    <Container>
      <Content>
        <List>
          {
            Object.keys(MODEL_TYPES)
              .map(scene => (
                <TrainTypeItem scene={scene as DatasetScene} key={scene} />
              ))
          }
        </List>
      </Content>
      <FooterBar rightContent={rightContent} />
    </Container>
  )
}

export default SelectTrainType
