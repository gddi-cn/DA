
import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import { MODEL_GROUP_DETAIL } from '@src/router/pathName'
import api from '@api'
import moment from 'moment'
import { FileSearchOutlined } from '@ant-design/icons'

import './modelDrawer.module.less'

const ModelDrawer = (props:any) => {
  const { id } = props
  const [data, setData] = useState<Array<any>>([])

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await api.get(`/v3/devices/${id}/apps`)
        if (res.code === 0) {
          setData(res.data?.data || [])
        }
      } catch (e) {
        console.log()
      }
    }
    fn()
  }, [id, setData])

  return (
    <div className='modelDrawer' styleName='modelDrawer'>

      <TableHeader />
      {
        data.map((o:any) => {
          return (
            <TableItem key={o.id} data={o} />
          )
        })
      }
    </div>
  )
}

const TableHeader = () => {
  return (
    <div className='TableRow-modelDrawer header-color-modelDrawer'>

      <div>ID</div>
      <div>名称</div>
      <div>描述</div>
      <div>创建时间</div>
      <div>更新时间</div>
      {/* <div>模型列表</div> */}
    </div>
  )
}

const TableItem = (props: any) => {
  const { data: { id, name, description, create_time, update_time } } = props
  // const history = useHistory()
  // const hanldeClick = () => {
  //   history.push({
  //     pathname: MODEL_GROUP_DETAIL,
  //     search: `id=${id}`
  //   })
  // }
  // 去看应用
  const handleGoModelDetail = () => {
    console.log('11')
  }
  return (
    <div className='TableRow-modelDrawer TableItem-modelDrawer'>

      <div>{id}</div>
      <div className='version' onClick={handleGoModelDetail}>{name} <FileSearchOutlined /></div>
      <div title={description}>{description || '--'}</div>
      {/* <div  onClick={handleGoModelDetail}>{version}</div> */}
      <div>{moment(create_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
      <div>{moment(update_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
      {/* <div className='gotosee' onClick={hanldeClick}>点击查看</div> */}
    </div>
  )
}

export default ModelDrawer
