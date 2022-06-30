
import './test.module.less'
import FabricCanvas from '@src/components/DataSetVisual/FabricCanvas'
import { ScaleRight, ImageSlider } from '@src/UIComponents'
import api from '@api'
import { useCallback, useEffect, useMemo, useState } from 'react'

const Test = (props:any):JSX.Element => {
  console.log(props)

  const [dataList, setDataList] = useState<Array<any>>([])
  const [total, setTotal] = useState<number>(0)

  const leftContent = useMemo(() => {
    return (
      <div className='leftContent'>
        leftContent?
      </div>
    )
  }, [])

  const rightContent = useMemo(() => {
    return (
      <div className='rightContent'>
        <FabricCanvas data={[]} url="http://s3.ceph.k8s.gddi.com/storage-0l6qoa/2021/04/25/09455a12a6e3c6d805ebc769b04a9d987eb07aa1.jpg" />
      </div>
    )
  }, [])

  const fetchData = useCallback(async (page:number) => {
    try {
      const path = `/v2/sub-datasets/259017499872370688/images?page=${page}&page_size=10&class_id=31`
      const res = await api.get(path)
      if (res.code === 0) {
        console.log(res)
        if (res.data.items) {
          setDataList(res.data.items || [])
          setTotal(res.data.total)
        }
      }
    } catch (e) {

    }
  }, [])

  useEffect(() => {
    // 仅仅一次、所以elsint取消提醒
    fetchData(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderView = (data:any) => {
    return (
      <FabricCanvas zoom={false} data={[]} url={data?.url} />
    )
  }

  const renderDotView = (o:any) => {
    return (
      <img className='img_dot_btn' src={o?.thumbnail} />
    )
  }

  return (
    <div styleName='test'>

      <div className='ScaleRight_wrap'>
        <ScaleRight leftContent={leftContent} rightContent={rightContent} />
      </div>
      <div className='ImageSlider_wrap'>
        <ImageSlider needCache={true} fetchData={fetchData} total={total} dataList={dataList} renderView={renderView} renderDotView={renderDotView} />
      </div>
    </div>
  )
}

export default Test
