import React, { useEffect, useState, useMemo, useCallback } from 'react'
import api from '@api'
import { useNavigate } from 'react-router-dom'

import { Empty, Typography } from 'antd'
import Radar from './Radar'
import { FooterBar, GButton } from '@src/UIComponents'
import { processEchartsData } from './processEchartsData'
import DatasetInfo from './DatasetInfo'
import { APP_DATA_SET_INDEX, APP_MODEL_TRAIN_CONFIG } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './DatasetAnalysis.module.less'
import { AnalyzeData, AnalyzeItem } from '@views/DataSet/DatasetAnalysis/type'
import Details from '@views/DataSet/DatasetAnalysis/Details'
import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'

const ErrorHelper: React.FC<{msg: string}> = (
  {
    msg,
  }
) => (
  <Empty
    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
    imageStyle={{
      height: 160,
      marginTop: 60
    }}
    description={
      <span>
        {msg}
      </span>
    }
  >
  </Empty>
)

const DatasetAnalysis = (): JSX.Element => {
  const navigate = useNavigate()
  const [dataList, setDataList] = useState<Array<AnalyzeData>>([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('error')
  const [item, setItem] = useState<AnalyzeItem | undefined>(undefined)
  // 获取数据集概括信息
  const [datasetInfo, setDatasetInfo] = useState<Data>({} as Data)

  const detailData = useMemo(
    () => {
      const [data] = dataList.filter(x => x.sign === item)

      return data || undefined
    },
    [dataList, item]
  )

  // 数据集的信息
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const initFetchDatasetInfo = useCallback(
    async () => {
      try {
        if (activePipeLine?.APP_DATASET_ANALYSE) {
          const { id } = activePipeLine?.APP_DATASET_ANALYSE
          const res = await api.get(`/v3/datasets/${id}`)
          if (res.code === 0) {
            setDatasetInfo(res.data || {})

            if (res.data?.assess) {
              setDataList(processEchartsData(res.data.assess))
            } else {
              setError(true)
              setErrorMessage('数据正在分析中，你可以忽略此步骤，点击下一步继续训练')
            }
          } else {
            setError(true)
            setErrorMessage('数据正在分析中，你可以忽略此步骤，点击下一步继续训练')
          }
        }
      } catch (e) {

      }
    }, [activePipeLine]
  )

  useEffect(() => {
    initFetchDatasetInfo()
  }, [initFetchDatasetInfo])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_DATA_SET_INDEX
      })

      socketPushMsgForProject(
        activePipeLine,
        {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,
          APP_DATASET_ANALYSE: null
        }
      )
    }

    const goNext = () => {
      navigate({
        pathname: APP_MODEL_TRAIN_CONFIG
      })

      socketPushMsgForProject(
        activePipeLine,
        {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_MODEL_TRAIN_CONFIG,

        }
      )
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' type='default' onClick={handleGoback}>上一步</GButton>
        <GButton type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [activePipeLine, navigate])

  return (
    <div styleName='DatasetAnalysis'>
      <div className='da-container'>
        <div className='meta'>
          <DatasetInfo
            initFetchDatasetInfo={initFetchDatasetInfo}
            datasetInfo={datasetInfo}
          />
        </div>
        <div className='right'>
          {
            error ? (
              <ErrorHelper msg={errorMessage} />
            ) : (
              <div className='analysis'>
                <div className="radar">
                  <div className="title">
                    <Typography.Title level={5}>
                      数据分析维度
                    </Typography.Title>
                  </div>
                  <Radar dataList={dataList} onItemChange={(item) => setItem(item)} />
                </div>
                <div className="detail">
                  <div className="title">
                    <Typography.Title level={5}>
                      数据分析详情
                    </Typography.Title>
                  </div>
                  <Details detail={detailData || {}} />
                </div>
              </div>
            )
          }
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default DatasetAnalysis
