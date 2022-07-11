
import { useEffect, useState, useMemo, useCallback } from 'react'
import api from '@api'
import { useLocation, useNavigate } from 'react-router-dom'
import Qs from 'qs'
import { Empty } from 'antd'
import Radar from './analysisRadar/radar'
import { FooterBar, GButton } from '@src/UIComponents'
import { isEmpty, isNil } from 'lodash'
import { processEchartsData } from './analysisRadar/processEchartsData'
import DatasetInfo from './DatasetInfo'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { bytesToSize } from '@src/utils'
import { APP_DATA_SET_INDEX, APP_MODEL_TRAIN_CONFIG } from '@router'

import './DatasetAnalysis.module.less'

const DatasetAnalysis = (): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const [dataList, setDataListt] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('error')

  const [version, setVersion] = useState<any>({})

  const [versionList, setVersionList] = useState<any[]>([])

  const [value, setValue] = useState<string>('')

  const [currentSet, setCurrentSet] = useState<any>({})

  // 获取数据集概括信息
  const [datasetInfo, setDatasetInfo] = useState<Data>({} as Data)

  const { search } = location
  const { id, version_id } = Qs.parse(search.substring(1))
  // 数据集的信息
  const initFetchDatasetInfo = useCallback(
    async () => {
      try {
        const res = await api.get(`/v2/datasets/${id}`)
        if (res.code === 0) {
          setDatasetInfo(res.data || {})
        }
      } catch (e) {

      }
    }, [id]
  )

  const initFetch = useCallback(async () => {
    try {
      if (id && version_id) {
        const path = `/v2/datasets/${id}/versions`
        const res = await api.get(path)
        if (res.code === 0) {
          const list = res.data || [];
          const target = (list as Array<any>).find((o) => o.id === version_id)

          if (target) {
            setValue(target.tag)
            setVersion(target)
          } else {
            const target = list[0]
            if (target) {
              setValue(target.tag)
              setVersion(target)
            }
          }
          setVersionList(list)
        }
      }
    } catch (e) {

    }
  }, [id, version_id])

  const getAnalysisData = useCallback(
    async ({ id, version_id }:any) => {
      try {
        const res = await api.get(`/v2/datasets/${id}/versions/${version_id}/assess`)
        if (res.code === 0) {
          const { data } = res
          if (!isEmpty(data) && !isNil(data)) {
            const _v = data
            if (Object.prototype.hasOwnProperty.call(_v, 'error')) {
              setError(true)
              setErrorMessage(_v?.error?.message)
            } else {
              const { dataList } = processEchartsData(_v)
              setDataListt(dataList)
            }
          } else {
            return true
          }
        } else {
          setError(true)
          setErrorMessage('数据正在分析中，你可以忽略此步骤，点击下一步继续训练')

          return {}
        }
      } catch (e) {
        return {}
      }
    }, []
  )

  const fetAllSet = useCallback(async () => {
    console.log(1)
    try {
      if (!isEmpty(version)) {
        const trainRes = await api.get(`/v2/sub-datasets/${version.trainset_id}`)
        // const validRes = await api.get(`/v2/sub-datasets/${version.validset_id}`)

        if (trainRes.code === 0) {
          setCurrentSet(trainRes.data || {})
        }
      }
    } catch (e) {

    }
  }, [version])

  useEffect(() => {
    getAnalysisData({ id, version_id })
  }, [getAnalysisData, id, version_id])

  useEffect(() => {
    fetAllSet()
  }, [fetAllSet])

  useEffect(() => {
    initFetchDatasetInfo()
    initFetch()
  }, [initFetchDatasetInfo, initFetch])

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_DATA_SET_INDEX
      })
    }

    const goNext = () => {
      navigate({
        pathname: APP_MODEL_TRAIN_CONFIG
      })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' type='default' onClick={handleGoback}>上一步</GButton>
        <GButton type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [navigate])

  const getViews = () => {
    if (error) {
      return (
        <Empty
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          imageStyle={{
            height: 160,
            marginTop: 60
          }}
          description={
            <span>
              {errorMessage}
            </span>
          }
        >
          {/* <Button type='primary'>返回上一步</Button> */}
        </Empty>
      )
    }
    return <Radar dataList={dataList} />
  }

  const handleChange = (value: any, option: any) => {
    const data = option['data-value']

    // 内部
    setValue(data.id)
    // 外部用i
    setVersion(data)

    getAnalysisData({ id, version_id: data.id })
  }

  console.log(version)

  return (
    <div styleName='DatasetAnalysis'>
      <div className='DatasetAnalysis_wrap'>
        <div className='DatasetAnalysis_l_wrap'>
          <DatasetInfo initFetchDatasetInfo={initFetchDatasetInfo} datasetInfo={datasetInfo} versionList={versionList} handleChange={handleChange} value={value}/>
        </div>
        <div className='DatasetAnalysis_r_wrap'>
          <div className='dataset_info'>
            <div className='info_list'>
              <div className='info_item_wrap'>
                <p className='label'>数据大小：</p>
                <p className='text'>{currentSet.size ? bytesToSize(currentSet.size) : '--'}</p>
              </div>
              <div className='info_item_wrap'>
                <p className='label'>数据量：</p>
                <p className='text'>{currentSet.image_count}</p>
              </div>
              <div className='info_item_wrap'>
                <p className='label'>标注数：</p>
                <p className='text'>{currentSet.annotation_count}</p>
              </div>
              <div className='info_item_wrap'>
                <p className='label'>标签种类：</p>
                <p className='text'>{currentSet.class_count}</p>
              </div>
            </div>
          </div>
          {
            getViews()
          }
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default DatasetAnalysis
