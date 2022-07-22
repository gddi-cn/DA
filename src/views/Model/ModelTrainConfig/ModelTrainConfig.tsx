import { FooterBar, GButton } from '@src/UIComponents'
import { useCallback, useEffect, useMemo, useState } from 'react'
import FilterHeader from './SelectChip/FilterHeader'
import ConfigSetting from './ConfigSetting'
import ChipList from './SelectChip/ChipList'
import api from '@api'
import { Form, message } from 'antd'
// import ModelTrainConfigType from './types'

import { titleMap } from './SelectChip/config'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_ANALYSE, APP_MODEL_TRAIN_DETAIL } from '@router'
import { getTaskActiveList } from '@reducer/tasksSilce'

// APP_MODEL_TRAIN_DETAIL

import { socketPushMsgForProject } from '@ghooks'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import './ModelTrainConfig.module.less'
import { isEmpty } from 'lodash'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

const taskType = 'detection'
const ModelTrainConfig = (): JSX.Element => {
  const dispath = useDispatch()
  const navigate = useNavigate()
  const [brandList, setBrandList] = useState<any[]>([])
  const [chipList, setChipList] = useState<any[]>([])
  const [formInstance] = Form.useForm();
  // const [selected, setSelected] = useState<ModelTrainConfigType.ChipFetchResItem>({})

  const [maxFps, setMaxFps] = useState(30)

  const [nextLoading, setNextLoading] = useState(false)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo || {}
  })

  useEffect(() => {
    if (!isEmpty(activePipeLine?.APP_MODEL_TRAIN_CONFIG)) {
      formInstance.setFieldsValue(activePipeLine?.APP_MODEL_TRAIN_CONFIG)
      setMaxFps(activePipeLine?.APP_MODEL_TRAIN_CONFIG?.chip_info?.fps_limited)
    }
  }, [activePipeLine, formInstance])

  const fetchBrand = useCallback(
    async () => {
      try {
        const res = await api.get('/v3/capacity/-/brands')
        if (res.code === 0) {
          console.log(res)
          if (res.data) {
            const { data } = res
            const list = (data as any[]).map((o) => {
              return {
                label: titleMap[o.name],
                id: o.name
              }
            })
            list.unshift({
              label: '全部品牌',
              id: ''
            })
            setBrandList(list)
          }
        }
      } catch (e) {

      }
    }, []
  )

  const fetchChipList = useCallback(
    async (params:{
        brand: string, chip_type: string, name: string
    }) => {
      try {
        // const checkedType = ['monocular_3d_detection'].includes(taskType)
        // const application = checkedType ? 'cloud' : '-'
        const res = await api.get('/v3/capacity/-/chips', {
          params: {
            ...params, task_type: taskType
          }
        })
        if (res.code === 0) {
          console.log(res)
          setChipList(res.data)
        }
      } catch (e) {

      }
    }, []
  )

  useEffect(() => {
    fetchBrand()
  }, [fetchBrand])

  useEffect(
    () => {
      fetchChipList({ brand: '', chip_type: '', name: '' })
    }, [fetchChipList]
  )

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_DATASET_ANALYSE
      })
    }

    const goNext = async () => {
      try {
        const config = await formInstance.validateFields()

        // const config = await formInstance.getFieldsValue()
        // todo : 把选中的数据数据和这些合并、创建模型训练

        console.log(config)
        const {
          APP_DATA_SET_INDEX,

        } = activePipeLine
        const { fps, gpu_count, mode, chip_info, channel } = config
        const { application, brand, chip_type, name } = chip_info
        const _pro_Name = activeTaskInfo?.name
        const pro_name = _pro_Name === '未命名' ? `模型-${APP_DATA_SET_INDEX?.name || '未命名'}` : _pro_Name

        const trainParams = {
          dataset_id: APP_DATA_SET_INDEX?.id,
          dataset_version_id: APP_DATA_SET_INDEX?.latest_version?.id,
          describe: '--',
          gpu_count: gpu_count,

          model_args: { fps: fps, ddr: 50, io: 50, mode: mode, channel: channel },
          name: pro_name,
          platform: [brand, name, chip_type],
          application: application,

        }
        setNextLoading(true)
        const startTrainRes = await api.post('/v3/models', trainParams)
        if (startTrainRes?.code === 0) {
          console.log(startTrainRes)
          message.success('模型开始训练')
          const { data } = startTrainRes
          const params = {
            model: {
              id: data?.id,
              version_id: data?.version_id,
            },
            dataset: {
              id: APP_DATA_SET_INDEX?.id,
              version_id: APP_DATA_SET_INDEX?.latest_version?.id,
            },
            name: pro_name,
          }

          const id = activeTaskInfo?.id

          const patchProRes = await api.patch(`/v3/projects/${id}`, params)
          if (patchProRes?.code === 0) {
            socketPushMsgForProject(
              activePipeLine, {
                active_page: SNAPSHOT_KEY_OF_ROUTER.APP_MODEL_TRAIN_DETAIL,
                APP_MODEL_TRAIN_DETAIL: {
                  id: data?.id,
                  version_id: data?.version_id,
                }
              }
            )
            navigate({
              pathname: APP_MODEL_TRAIN_DETAIL
            })
            dispath(getTaskActiveList({

            }))
          }
        } else {
          setNextLoading(false)
        }

      // dataset_id: "259017471846031360"
      // dataset_version_id: "287632401679556608"
      // gpu_count: 1
      // model_args: { fps: 1 }
      // name: "自动训练-水果数据-3-模型"
      // platform: ["Cambricon", "MLU220", "NPU"]
      // navigate({
      //   pathname: APP_MODEL_TRAIN_DETAIL
      // })
      } catch (e:any) {
        console.log(e, 100)
        message.warning('请选择芯片')
      }
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' type='default' onClick={handleGoback}>上一步</GButton>
        <GButton type='primary' onClick={goNext} loading={nextLoading}>下一步</GButton>
      </div>
    )
  }, [activePipeLine, activeTaskInfo, dispath, formInstance, navigate, nextLoading])

  const handleBaseInfoChange = useCallback(
    (changeValues: any, all_values: any) => {
      console.log(changeValues)
      console.log(all_values, 'all_values')
      if (changeValues.chip_info) {
        const { chip_info } = changeValues
        const _fpsmax = chip_info.fps_limited || 30
        setMaxFps(_fpsmax)

        const _data = Object.assign(all_values, {
          mode: 2,
          fps: 5,
          channel: Math.floor(_fpsmax / 5)
        })
        socketPushMsgForProject(
          activePipeLine, {
            APP_MODEL_TRAIN_CONFIG: _data
          }
        )

        return
      }

      if (changeValues.fps) {
        const channel = Math.floor((maxFps / +changeValues.fps))

        const _data = Object.assign(all_values, {
          channel
        })
        socketPushMsgForProject(
          activePipeLine, {
            APP_MODEL_TRAIN_CONFIG: _data
          }
        )
      }

      if (changeValues.mode) {
        const { mode } = changeValues
        if (mode === 1) {
          const _fps = maxFps > 25 ? 25 : maxFps
          const channel = Math.floor((maxFps / _fps))

          const _data = Object.assign(all_values, {
            fps: _fps, channel
          })
          socketPushMsgForProject(
            activePipeLine, {
              APP_MODEL_TRAIN_CONFIG: _data
            }
          )
        } else if (mode === 2) {
          const _fps = maxFps > 5 ? 5 : maxFps
          const channel = Math.floor((maxFps / _fps))

          const _data = Object.assign(all_values, {
            fps: _fps, channel
          })
          socketPushMsgForProject(
            activePipeLine, {
              APP_MODEL_TRAIN_CONFIG: _data
            }
          )
        } else {
          const _fps = maxFps > 5 ? 5 : maxFps
          const channel = Math.floor((maxFps / _fps))
          const _data = Object.assign(all_values, {
            fps: 5, channel
          })

          socketPushMsgForProject(
            activePipeLine, {
              APP_MODEL_TRAIN_CONFIG: _data
            }
          )
        }
      }
      socketPushMsgForProject(
        activePipeLine, {
          APP_MODEL_TRAIN_CONFIG: all_values
        }
      )
      // 如果变得芯片,应该初始化左边数据
    }, [activePipeLine, maxFps]
  )
  return (
    <div styleName='ModelTrainConfig'>
      <div className='ModelTrainConfig_wrap'>
        <div className='ModelTrainConfig_wrap_left'>
          <ConfigSetting formInstance={formInstance} maxFps={maxFps}/>
        </div>
        <div className='ModelTrainConfig_wrap_right'>
          {
            useMemo(() => {
              return (
                <FilterHeader brandList={brandList} fetchChipList={fetchChipList}/>
              )
            }, [brandList, fetchChipList])
          }
          {
            useMemo(() => {
              return (
                <Form form={formInstance} name="ChipList" className='form_wrap' onValuesChange={handleBaseInfoChange}>
                  <Form.Item
                    noStyle
                    name='chip_info'

                    rules={[{ required: true, message: '请选择芯片' }]}
                  >
                    <ChipList chipList={chipList} />
                  </Form.Item>

                </Form>
              )
            }, [chipList, formInstance, handleBaseInfoChange])
          }
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default ModelTrainConfig
