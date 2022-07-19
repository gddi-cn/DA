import { ReactCusScrollBar } from '@src/UIComponents'
import { Spin, Empty } from 'antd'
import { isEmpty } from 'lodash'
import Opreations from '../common/Opreations'
import moment from 'moment';
import './DeviceTable.module.less'

const column = [
  {
    label: '设备名称'
  },
  {
    label: '设备SN'
  },
  {
    label: '设备类型'
  },
  {
    label: 'AI芯片型号'
  },
  {
    label: '注册时间'
  },
  {
    label: '设备状态'
  },

]
type Props={
    dataList:any[],
    tableLoading:boolean,
    groupSelected:any,
    fetchDeviceList:any,
    deviceType:any
}
const DeviceTable = (props: Props): JSX.Element => {
  const { dataList = [], tableLoading, groupSelected, fetchDeviceList, deviceType } = props

  const getState = (state:string) => {
    const objText: any = {
      online: '在线',
      offline: '离线',
      deleted: '已注销'
    }
    return objText[state] || '-'
  }

  const getView = () => {
    if (tableLoading) {
      return (
        <div className='loading_wrap'>
          <Spin></Spin>
          <p>正在加载数据……</p>
        </div>
      )
    }

    if (isEmpty(dataList)) {
      return (
        <div className='loading_wrap'>
          <Empty />

        </div>
      )
    }

    return (
      <ReactCusScrollBar id='DeviceTable_body_wrap'>
        <div className='DeviceTable_body_list'>
          {
            dataList.map((o, i) => {
              const { name, type, sn, chip, create_time, state } = o
              return (
                <div key={i} className='DeviceTable_body_item_wrap'>
                  <div className='DeviceTable_body_item'>
                    {name || '-'}
                  </div>
                  <div className='DeviceTable_body_item'>
                    {sn || '-'}
                  </div>
                  <div className='DeviceTable_body_item'>
                    {type || '-'}
                  </div>
                  <div className='DeviceTable_body_item'>
                    {chip || '-'}
                  </div>
                  <div className='DeviceTable_body_item'>
                    {moment(create_time * 1000).format('YYYY-MM-DD HH:mm:ss') }
                  </div>
                  <div className='DeviceTable_body_item'>
                    {getState(state)}
                  </div>
                  <div className='DeviceTable_body_item_op'>
                    <Opreations data={o} selected={{ id: groupSelected }} fetchDeviceList={fetchDeviceList} deviceType={deviceType}/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </ReactCusScrollBar>
    )
  }

  return (
    <div styleName='DeviceTable'>
      <div className='DeviceTable_header'>
        {
          column.map((o, i) => {
            return (
              <div key={i} className='DeviceTable_header_item'>{o.label}</div>
            )
          })
        }
        <div className='DeviceTable_header_item_op'>操作</div>
      </div>

      <div className='DeviceTable_body_wrap'>
        {
          getView()
        }
      </div>
    </div>
  )
}

export default DeviceTable
