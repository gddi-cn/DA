import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import api from '@api'
import { useNavigate } from 'react-router-dom'
import { Empty, Typography } from 'antd'
import Radar from './Radar'
import { FooterBar, GButton, ReactCusScrollBar } from '@src/UIComponents'
import { processEchartsData } from './processEchartsData'
import DatasetInfo from './DatasetInfo'
import { APP_DATA_SET_INDEX, APP_MODEL_TRAIN_CONFIG } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
// import './DatasetAnalysis.module.less'
import Details from '@views/DataSet/DatasetAnalysis/Details'
import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { AnalyzeData } from '@src/shared/types/dataset'
import { AnalyzeItem } from '@src/shared/enum/dataset'
import { SecondaryBtn, PrimaryBtn } from '@src/components/Button'
import { useBack2DatasetIndex } from '@src/hooks/task'

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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const DatasetAnalysis = (): JSX.Element => {
  const navigate = useNavigate()
  const [dataList, setDataList] = useState<Array<AnalyzeData>>([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('error')
  const [item, setItem] = useState<AnalyzeItem | undefined>(undefined)
  // 获取数据集概括信息
  const [datasetInfo, setDatasetInfo] = useState<Data>({} as Data)

  const handleCnacel = useBack2DatasetIndex()

  const detailData = useMemo(
    () => {
      // 兼容旧数据
      if (item === AnalyzeItem.ImageSize || item === AnalyzeItem.FineSize) {
        const [data] = dataList
          .filter(x => x.sign === AnalyzeItem.ImageSize || x.sign === AnalyzeItem.FineSize)
          .filter(Boolean)

        return data || undefined
      }

      if (item === AnalyzeItem.SceneDiversity || item === AnalyzeItem.ImgDiscrimination) {
        const [data] = dataList
          .filter(x => x.sign === AnalyzeItem.SceneDiversity || x.sign === AnalyzeItem.ImgDiscrimination)
          .filter(Boolean)

        return data || undefined
      }

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
              setDataList(processEchartsData(res.data.assess, activePipeLine.APP_DATA_SET_INDEX?.scene))
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
    <div styleName='DatasetAnalysis'>
      <div className='da-container'>
        <div className='meta'>
          <ReactCusScrollBar id='dataset_meta'>
            <div className="wrap">
              <DatasetInfo
                initFetchDatasetInfo={initFetchDatasetInfo}
                datasetInfo={datasetInfo}
              />
            </div>
          </ReactCusScrollBar>
        </div>
        <div className='right'>
          {
            error ? (
              <ErrorHelper msg={errorMessage} />
            ) : (
              <ReactCusScrollBar id='dataset_ana_right'>
                <div className='analysis'>
                  <div className="radar">
                    <div className="title">
                      <Typography.Title level={5} className='content'>
                        数据分析维度
                      </Typography.Title>
                    </div>
                    <Radar dataList={dataList} onItemChange={(item) => setItem(item)} />
                  </div>
                  <div className="detail">
                    <div className="title">
                      <Typography.Title level={5} className='content'>
                        数据分析详情
                      </Typography.Title>
                    </div>
                    <Details detail={detailData || {}} />
                  </div>
                </div>
              </ReactCusScrollBar>
            )
          }
        </div>
      </div>
      <FooterBar
        leftContent={(
          <SecondaryBtn width={132} onClick={handleCnacel}>取消</SecondaryBtn>
        )}
        rightContent={(
          <FooterRight>
            <SecondaryBtn width={132} onClick={handleGoback}>上一步</SecondaryBtn>
            <PrimaryBtn width={132} onClick={goNext}>下一步</PrimaryBtn>
          </FooterRight>
        )}
      />
    </div>
  )
}

export default DatasetAnalysis
