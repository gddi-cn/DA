import { TypeSettingBotton } from '@src/UIComponents'
import { useEffect, useMemo, useState } from 'react'
import api from '@api'
import Listview from './Listview'
import SlickView from './SlickView'
import { objectToArray } from '../../utils'

import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import './ForecastExample.module.less'
import { isEmpty } from 'lodash'

const ForecastExample = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const [dataList, setDataList] = useState<any[]>([])
  const [viewType, setViewType] = useState<string>('grid')

  const handleTypeChange = (key: string) => {
    setViewType(key)
  }

  useEffect(() => {
    const fn = async () => {
      try {
        if (!versionInfo) {
          return
        }
        const { id, iter } = versionInfo
        if (!id || !iter?.id) return

        const res = await api.get(`/v2/models/${id}/versions/${iter?.id}/samples`)
        if (res.code === 0) {
          const arr = objectToArray(res.data?.images)
          setDataList(arr)
        } else {

        }
      } catch (e) {

      }
    }
    fn()
  }, [versionInfo])

  const view = useMemo(() => {
    const ReactComp: {
          [index: string]: React.ReactNode
      } = {

        grid: <Listview dataList={dataList} versionInfo={versionInfo} />,
        slick: <SlickView dataList={dataList} versionInfo={versionInfo} />,

      }
    if (isEmpty(dataList)) {
      return null
    }
    return ReactComp[viewType] || null
  }, [dataList, viewType, versionInfo])

  return (
    <div styleName='ForecastExample'>
      <div className='select_view_type'>
        <div className='select_view_type_right_wrap'>
          <TypeSettingBotton onChange={handleTypeChange} />
        </div>
      </div>

      <div className='example_view'>
        {view}
      </div>
    </div>
  )
}

export default ForecastExample
