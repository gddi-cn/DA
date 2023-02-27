import React from 'react'
import { useAtom } from 'jotai'

import {
  cardNumAtom, configConcurrentAtom, configFpsAtom, configTypeAtom, selectedChipAtom
} from '@views/Model/TrainConfig/store'
import { APP_DATASET_ANALYSE, APP_MODEL_TRAIN_DETAIL } from '@router'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { ModelTrainMode } from '@src/shared/enum/model'
import modelAPI from '@src/apis/model'
import projectAPI from '@src/apis/project'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { checkoutTask, getTaskActiveList } from '@reducer/tasksSilce'
import { ChipConfigType } from '@src/shared/enum/chip'

export const useFooter = () => {
  const [selectedChip] = useAtom(selectedChipAtom)
  const [fps] = useAtom(configFpsAtom)
  const [channel] = useAtom(configConcurrentAtom)
  const [gpu_count] = useAtom(cardNumAtom)
  const [configType] = useAtom(configTypeAtom)

  const [loading, setLoading] = React.useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const disabledNext = !Boolean(selectedChip)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo || {}
  })

  const handleGoBack = () => {
    navigate({ pathname: APP_DATASET_ANALYSE })
  }

  const handleTrain = async () =>{
    if (!fps || !selectedChip || !channel || !gpu_count || loading || !activeTaskInfo) return

    const mode = configType === ChipConfigType.RECOMMEND ? ModelTrainMode.SPEED : ModelTrainMode.CUSTOM

    const { APP_DATA_SET_INDEX } = activePipeLine

    if (!APP_DATA_SET_INDEX) return

    const { application, brand, chip_type, name } = selectedChip

    const _pro_name = activeTaskInfo.name || '未命名'
    const pro_name = _pro_name === '未命名' ? `模型-${APP_DATA_SET_INDEX.name || '未命名'}` : _pro_name

    setLoading(true)

    const { success, data } = await modelAPI.createModel({
      dataset_id: APP_DATA_SET_INDEX.id,
      describe: '--',
      gpu_count,
      model_args: { fps, ddr: 50, io: 50, mode, channel },
      name: pro_name,
      platform: [brand, name, chip_type],
      application,
    })

    if (!success || !data || !activeTaskInfo.id || !APP_DATA_SET_INDEX.id) return setLoading(false)

    const { success: s, data: res } = await projectAPI.update(activeTaskInfo.id, {
      model: {
        id: data.id,
        version_id: data.version_id,
      },
      dataset: {
        id: APP_DATA_SET_INDEX.id
      },
      name: pro_name,
    })

    if (!success || !data) return setLoading(false)

    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_MODEL_TRAIN_DETAIL,
        APP_MODEL_TRAIN_DETAIL: {
          id: data?.id,
          version_id: data?.version_id,
        }
      }
    )
    navigate({ pathname: APP_MODEL_TRAIN_DETAIL })
    dispatch(checkoutTask(res))
    dispatch(getTaskActiveList({}))

    setLoading(false)
  }


  return {
    disabledNext,
    handleGoBack,
    loading,
    handleTrain,
  }
}
