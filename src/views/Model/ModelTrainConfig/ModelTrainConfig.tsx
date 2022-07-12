import { FooterBar, GButton } from '@src/UIComponents'
import { useCallback, useEffect, useMemo, useState } from 'react'
import FilterHeader from './SelectChip/FilterHeader'
import ConfigSetting from './ConfigSetting'
import ChipList from './SelectChip/ChipList'
import api from '@api'
import { Form, message } from 'antd'
import ModelTrainConfigType from './types'
import { isEmpty } from 'lodash'
import { titleMap } from './SelectChip/config'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_ANALYSE } from '@router'
import './ModelTrainConfig.module.less'

const taskType = 'detection'
const ModelTrainConfig = (): JSX.Element => {
  const navigate = useNavigate()
  const [brandList, setBrandList] = useState<any[]>([])
  const [chipList, setChipList] = useState<any[]>([])

  const [selected, setSelected] = useState<ModelTrainConfigType.ChipFetchResItem>({})

  const [formInstance] = Form.useForm();
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
      if (isEmpty(selected)) {
        message.warning('请选择芯片')
        return
      }
      const config = await formInstance.getFieldsValue()
      // todo : 把选中的数据数据和这些合并、创建模型训练
      console.log(selected)
      console.log(config)
      // dataset_id: "259017471846031360"
      // dataset_version_id: "287632401679556608"
      // gpu_count: 1
      // model_args: { fps: 1 }
      // name: "自动训练-水果数据-3-模型"
      // platform: ["Cambricon", "MLU220", "NPU"]
      // navigate({
      //   pathname: APP_MODEL_TRAIN_CONFIG
      // })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' type='default' onClick={handleGoback}>上一步</GButton>
        <GButton type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [formInstance, selected, navigate])
  return (
    <div styleName='ModelTrainConfig'>
      <div className='ModelTrainConfig_wrap'>
        <div className='ModelTrainConfig_wrap_left'>
          <ConfigSetting selected={selected} formInstance={formInstance}/>
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
                <ChipList chipList={chipList} selected={selected} setSelected={setSelected}/>
              )
            }, [chipList, selected])
          }
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default ModelTrainConfig
