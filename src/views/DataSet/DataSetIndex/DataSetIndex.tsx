
import { TagRadioSelect, FooterBar, GButton, GIconInput, CusRadio } from '@src/UIComponents'
import DatasetList from './DatasetList'
import { MODEL_TYPES, SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { isEmpty, isNil } from 'lodash'
import { message, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_ANALYSE } from '@router'
import { modifyActiveTask } from '@reducer/tasksSilce'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer'
import './DataSetIndex.module.less'
import moment from 'moment'

const dataList:{label:string, id:string}[] = [
  { label: '全部类型', id: 'all' }
]

for (const [k, v] of Object.entries(MODEL_TYPES)) {
  dataList.push(
    {
      label: v,
      id: k
    }
  )
}

const DataSetIndex = (): JSX.Element => {
  const paramsChangeAndFetch = useRef<any>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectData, setSelectData] = useState<any>({})

  const [publicStatus, setPublicStatus] = useState(false)

  const [datasetName, setDatasetName] = useState<any>(undefined)

  const deferName = useDeferredValue(datasetName)
  const [isPublic, setIsPublic] = useState('2')

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const reactKey = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo?.id
  })

  useEffect(() => {
    if (isNil(deferName)) {
      return
    }
    if (paramsChangeAndFetch.current) {
      paramsChangeAndFetch.current({ name: deferName }, { isInit: true })
    }
  }, [deferName])

  const handleOnChange = (data:any) => {
    let _id = data.id
    if (_id === 'all') {
      _id = undefined
    }

    if (paramsChangeAndFetch.current) {
      paramsChangeAndFetch.current({ scene: _id }, { isInit: true })
    }
  }

  const FooterRightView = () => {
    const handleNext = () => {
      if (isEmpty(selectData) || isNil(selectData)) {
        message.warning('请选择数据集')
        return
      }
      const { train_set, val_set } = selectData
      if (train_set?.class_count !== val_set?.class_count) {
        notification.error({
          message: '提示',
          duration: 3,
          description:
            '训练数据与测试数据标签不一致，请补全数据后再开始训练。',
        });
        return
      }

      if (!activePipeLine.taskNameChanged) {
        const name = moment().format('MM-DD') + '/' + selectData.name

        dispatch(modifyActiveTask({ id: reactKey, params: { name } }))
      }

      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_ANALYSE,
          APP_DATASET_ANALYSE: { id: selectData?.id }
        }
      )

      navigate({
        pathname: APP_DATASET_ANALYSE,
      })
    }
    return (
      <GButton type='primary' className={isEmpty(selectData) || isNil(selectData) ? 'not_allow' : 'yes_sir'} style={{ width: 132 }} onClick={handleNext}>下一步</GButton>
    )
  }

  const handleCusRadioChange = (value:string) => {
    setIsPublic(value)

    if (value === '1') {
      if (paramsChangeAndFetch.current) {
        setPublicStatus(true)
        paramsChangeAndFetch.current({ is_public: true }, { isInit: true })
      }
    } else {
      if (paramsChangeAndFetch.current) {
        setPublicStatus(false)
        paramsChangeAndFetch.current({ is_public: false }, { isInit: true })
      }
    }
  }
  const handleSearch = (v: React.ChangeEvent<HTMLInputElement>) => {
    const value = v.target.value
    setDatasetName(value || '')
  }
  return (
    <div styleName='DataSetIndex' className='maxWidthAuto' >

      <div className='dataset_list_header'>
        <GIconInput className='dataset_name_search' placeholder='请输入数据集名称' onChange={handleSearch} allowClear/>
        <CusRadio
          className='CusRadio_wrap'
          value={isPublic}
          onChange={handleCusRadioChange}
          options={
            [
              { label: '公开数据集', value: '1' }, { label: '私有数据集', value: '2' }
            ]
          }
        />
        <TagRadioSelect dataList={dataList} onChange={handleOnChange} value="all"/>
      </div>

      <div className='dataset_list_wrap'>
        {
          useMemo(() => {
            return (
              <DatasetList ref={paramsChangeAndFetch} setSelectData={setSelectData} publicStatus={publicStatus} />
            )
          }, [publicStatus])
        }
      </div>
      <FooterBar rightContent={<FooterRightView/>}/>
    </div>
  )
}

export default DataSetIndex
