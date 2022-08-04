
import ConfigForm from './ConfigForm'
import ContrastView from './ContrastView'
import api from '@api'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { getTableData } from './utils'
import './ModelContrast.module.less'
import { isEmpty } from 'lodash'

const tranFormData = (rawData: any[]) => {
  const dataset_list:any[] = []

  let modelVersions = []
  for (let i = 0; i < rawData.length; i++) {
    const { dataset_id, name, versions } = rawData[i]
    dataset_list.push(
      {
        dataset_id, name
      }
    )

    if (isEmpty(modelVersions)) {
      modelVersions = versions.map((o: any) => {
        const { tag } = o
        return {
          tag
        }
      })
    }
  }

  return {
    dataset_list,

    modelVersions
  }
}

const ModelContrast = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })

  const [filterParams, setFilterParams] = useState<any>({

  })

  const deferFilterParams = useDeferredValue(filterParams)

  const [dataList, setDataList] = useState<any>([])
  const [versionListSet, setVersionListSet] = useState<any>({
    dataset_list: [], modelVersions: []
  })

  const raw_data = useRef<any[]>([])

  // const [loading, setloading] = useState(false)

  // console.log(loading)

  useEffect(() => {
    console.log(deferFilterParams, raw_data.current)
    if (!deferFilterParams.dataset_version) {
      return
    }
    const list = getTableData(raw_data.current, deferFilterParams)
    console.log(list)
    setDataList(list)
  }, [deferFilterParams])

  useEffect(() => {
    const fn = async () => {
      try {
        // setloading(true)
        // const { model_type } = versionInfo
        const best_threshold = versionInfo.iter.result?.best_threshold
        const best = best_threshold * 100
        const res = await api.get(`/v2/models/${versionInfo.id}/compareversions`)
        if (res.code === 0) {
          console.log(res)
          if (res.data) {
            const {
              dataset_list,
              modelVersions,

            } = tranFormData([res.data])
            // 最初说返回N个版本，现在不需要了，代码预留了，现在懒得改
            raw_data.current = [res.data]

            setVersionListSet({
              dataset_list, modelVersions
            })
            // 默认
            setFilterParams({
              config_type: 'version',
              thres_s: best,
              dataset_version: raw_data.current[0].dataset_id
            })
          }
          // setCompareversions(listData)
        } else {
          // setloading(false)
        }
      } catch (e) {
        console.log(e, 'eeee')

        // setloading(false)
      }
    }
    fn()
  }, [versionInfo])
  return (
    <div styleName='ModelContrast'>
      <div className='model_info_wrap'>
        <ConfigForm versionListSet={versionListSet} setFilterParams={setFilterParams}/>

      </div>
      <div className='ModelContrast_wrap'>
        <ContrastView dataList={dataList} deferFilterParams={deferFilterParams}/>

      </div>
    </div>
  )
}

export default ModelContrast
