
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { ReactComponent as Bushu } from './icon/bushu.svg'
import { ReactComponent as Moxing } from './icon/moxing.svg'
import { ReactComponent as Shuju } from './icon/shuju.svg'
import { ReactComponent as Arrow } from './icon/arrow.svg'
import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import TaskNameBar from '../TaskNameBar'
import ModelIterrator from '../ModelIterrator'
import {
  APP_DATA_SET_INDEX,
  APP_DATASET_DETAIL,
  APP_MODEL_TRAIN_DETAIL,
  // APP_GUIDE_PAGE,
  APP_DATASET_ANALYSE,
  APP_MODEL_TRAIN_CONFIG,

  // 部署
  APP_SELECT_DEPLOY_TYPE,
  APP_SelectDevice,
  APP_SDK_Documents,
  APP_AfterDeployed,
  APP_ForecastModule,
  APP_SelectModule,
  APP_SetModuleConfig,
  APP_LOCAL_FILE,
  APP_LOCAL_FILE_STEP_1,
  APP_LOCAL_FILE_STEP_2,
  APP_LOCAL_FILE_STEP_3,
  APP_LOCAL_FILE_STEP_4,
  APP_THIRDPARTY,
  APP_THIRDPARTY_STEP_1,
  APP_THIRDPARTY_STEP_2,
  APP_THIRDPARTY_STEP_3,
  APP_THIRDPARTY_STEP_4,
  APP_THIRDPARTY_SelectTrainType,
  APP_DATASET_CREATE_TYPE,
  APP_EXPERIENCE,
  APP_PLATFORM,
} from '@router'

import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

import './TaskStep.module.less'
import { isNil } from 'lodash'
import ModelVersionSelector from '@src/components/ModelVersionSelector'

const DATASET_ACTIVE = [
  APP_DATA_SET_INDEX,
  APP_DATASET_DETAIL,
  APP_DATASET_ANALYSE,
  APP_MODEL_TRAIN_CONFIG,

  APP_LOCAL_FILE,
  APP_LOCAL_FILE_STEP_1,
  APP_LOCAL_FILE_STEP_2,
  APP_LOCAL_FILE_STEP_3,
  APP_LOCAL_FILE_STEP_4,
  APP_THIRDPARTY,
  APP_THIRDPARTY_STEP_1,
  APP_THIRDPARTY_STEP_2,
  APP_THIRDPARTY_STEP_3,
  APP_THIRDPARTY_STEP_4,
  APP_THIRDPARTY_SelectTrainType,
  APP_DATASET_CREATE_TYPE
]

const MODEL_ACTIVE = [
  APP_MODEL_TRAIN_DETAIL
]

const PUBLISH_ACTIVE = [
  APP_SELECT_DEPLOY_TYPE,
  APP_SelectDevice,
  APP_SDK_Documents,
  APP_AfterDeployed,
  APP_ForecastModule,
  APP_SelectModule,
  APP_SetModuleConfig,
  APP_EXPERIENCE,
  APP_PLATFORM,
]

const TaskStep: React.FC = () => {
  const { pathname } = useLocation()
  const showModelSelector = [
    APP_SELECT_DEPLOY_TYPE,
    APP_EXPERIENCE,
    APP_PLATFORM,
    APP_SDK_Documents
  ].includes(pathname)

  const disabledModelSelector = [
    APP_EXPERIENCE,
    APP_PLATFORM,
    APP_SDK_Documents
  ].includes(pathname)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine
  })
  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo
  })

  // const deploy = useSelector((state: RootState) => {
  //   return state.tasksSilce.activeTaskInfo?.deploy
  // })

  // 点击逻辑、
  // 数据存在可以看详情、不存在就去数据集list选择

  const handleDatasetClick = () => {
    // 如果未训练能点可能是张宇那边数据问题
    if (activeTaskInfo?.model?.id) {
      if (!isNil(activePipeLine)) {
        socketPushMsgForProject(
          activePipeLine,
          {
            active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL,
            APP_DATASET_DETAIL: {
              id: activeTaskInfo.dataset?.id,

            }
          }
        )
      }
    }

    // else {
    //   if (activePipeLine) {
    //     socketPushMsgForProject(
    //       activePipeLine,
    //       {
    //         active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,

    //       }
    //     )
    //   }
    // }
  }

  // 存在可以去看model详情、不存在则判断是不是选了数据了，有数据的情况下可以
  const handleModelClick = () => {
    if (activeTaskInfo?.model?.id) {
      if (activePipeLine) {
        socketPushMsgForProject(
          activePipeLine,
          {
            active_page: SNAPSHOT_KEY_OF_ROUTER.APP_MODEL_TRAIN_DETAIL,
          }
        )
      }
    }
  }

  // 存在可以去看model详情、不存在则不可点击
  // 要存在模型才可以点击这个、是模型必须训练完了才可以点击
  const handleDeployClick = () => {
    if (activeTaskInfo?.model?.id) {
      if (activePipeLine) {
        if (activeTaskInfo?.additional?.status === 2) {
          socketPushMsgForProject(
            activePipeLine,
            {
              active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE,
            }
          )
        }
      }
    }
  }

  const getDataCls = ():string => {
    if (activeTaskInfo?.model?.id) {
      return 'active_step_item'
    }
    return ''
  }

  const getModelCls = (): string => {
    if (activeTaskInfo?.model?.id) {
      return 'active_step_item'
    }
    return ''
  }

  const getDeployCls = (): string => {
    if (activeTaskInfo?.model?.id) {
      if (activeTaskInfo?.additional?.status === 2) {
        return 'active_step_item'
      }
      return ''
    }
    return ''
  }

  const getCls = (active_paths:any[], atvcls:string) => {
    if (active_paths.includes(pathname)) {
      return `step_item step_item_router_active ${atvcls}`
    }

    return `step_item ${atvcls}`
  }

  return (
    <div styleName='TaskStep'>
      <div className='TaskStep_step_wrap '>
        <div className={getCls(DATASET_ACTIVE, getDataCls())} onClick={handleDatasetClick}>
          <Shuju className='step_svg' />  数据
        </div>
        <span className='arrow_wrap'><Arrow /></span>
        <div className={getCls(MODEL_ACTIVE, getModelCls())} onClick={handleModelClick}>
          <Moxing className='step_svg'/> 模型
        </div>
        <span className='arrow_wrap'><Arrow /></span>
        <div className={getCls(PUBLISH_ACTIVE, getDeployCls())} onClick={handleDeployClick}>
          <Bushu className='step_svg'/> 部署
        </div>
      </div>

      <div className='modify_project_name_wrap'>
        {
          useMemo(
            () => <TaskNameBar />,
            []
          )
        }
      </div>
      <div className='right_wrap'>
        <ModelIterrator />
        {
          showModelSelector ? (
            <ModelVersionSelector
              disabled={disabledModelSelector}
            />
          ) : null
        }
      </div>
    </div>
  )
}

export default TaskStep
