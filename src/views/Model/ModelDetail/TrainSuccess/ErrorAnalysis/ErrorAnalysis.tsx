import { TabsHeader } from '@src/UIComponents'
import { useState, useMemo, useEffect } from 'react'
import AnalysisError from './AnalysisError'
import SencesError from './SencesError'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { Skeleton } from 'antd';
import api from '@api'
import './ErrorAnalysis.module.less'

const dataList = [
  {
    label: '场景错误识别分析',
    primaryKey: 'sences_error',
    icon: null
  },
  {
    label: '标签错误识别分析',
    primaryKey: 'analysis_error',
    icon: null
  }
]

const ErrorAnalysis = (): JSX.Element => {
  const [subTabIndex, setSubTabIndex] = useState<any>('sences_error')
  const [loading, setLoading] = useState<any>({});
  const [errData, setErrData] = useState<any>({
    confusion_matrix: {

    },
    scene_false: {

    }
  });

  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const handleChangeTab = (key: any) => {
    setSubTabIndex(key)
  }

  useEffect(() => {
    const fn = async () => {
      try {
        const { id, iter } = versionInfo
        if (!id || !iter) {
          return
        }
        setLoading(true)
        const res = await api.get(`/v2/models/${id}/versions/${iter?.id}/falseanalysis`)
        if (res.code === 0) {
          res.data && setErrData(res.data)
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (e) {
        setLoading(false)
      }
    }
    fn()
  }, [versionInfo])

  const View = useMemo(() => {
    if (loading) {
      return (
        <Skeleton active />
      )
    }
    const ReactComp: {
      [index: string]: React.ReactNode
    } = {
      sences_error: <SencesError data={errData.scene_false} />,
      analysis_error: <AnalysisError data={errData.confusion_matrix}/>,

    }

    return ReactComp[subTabIndex] || null
  }, [subTabIndex, loading, errData])

  return (
    <div styleName='ErrorAnalysis'>
      <div className='Transversion_header'>
        <TabsHeader dataList={dataList} handleChangeTab={handleChangeTab} defualtActiveKey="sences_error" />
      </div>
      <div className='Transversion_content'>
        {View}
      </div>
    </div>
  )
}

export default ErrorAnalysis
