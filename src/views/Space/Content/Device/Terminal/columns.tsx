import { ColumnType } from 'antd/es/table'
import { GroupDevice } from '@src/shared/types/device'
import { Tooltip } from 'antd'
import { formatUnixTime } from '@src/utils/tools'
import { groupDeviceStateColorMapping, groupDeviceStateNameMapping } from '@src/shared/mapping/device'

const columns: Array<ColumnType<GroupDevice>> = [
  {
    title: '设备名称',
    dataIndex: 'name',
    ellipsis: true,
    width: 3,
    render: (name: string) => {
      return (
        <Tooltip title={name || '-'}>
          <span>{name || '-'}</span>
        </Tooltip>
      )
    }
  },
  {
    title: '设备 SN',
    dataIndex: 'sn',
    ellipsis: true,
    width: 3,
    render: (sn: string) => {
      return (
        <Tooltip title={sn || '-'}>
      <span>{sn || '-'}</span>
      </Tooltip>
    )
    }
  },
  {
    title: 'AI 芯片类型',
    dataIndex: 'chip',
    ellipsis: true,
    width: 2,
    render: (chip: string) => {
      return (
        <Tooltip title={chip || '-'}>
          <span>{chip || '-'}</span>
        </Tooltip>
      )
    }
  },
  {
    title: '注册时间',
    dataIndex: 'create_time',
    ellipsis: true,
    width: 3,
    render: (created: number) => {
      const time = created ? formatUnixTime(created) : '-'
      return (
        <Tooltip title={time}>
          <span>{time}</span>
        </Tooltip>
      )
    }
  },
  {
    title: '任务最大并发数',
    dataIndex: 'max_process',
    ellipsis: true,
    width: 2,
    render: (max: number) => {
      const limit = max === 0 ? '无限制' : (max ?? '-')

      return (
        <Tooltip title={limit}>
          <span>{limit}</span>
        </Tooltip>
      )
    }
  },
  // {
  //   title: '设备状态',
  //   dataIndex: 'state',
  //   ellipsis: true,
  //   width: 2,
  //   render: (state: GroupDevice['state']) => {
  //     const color = state ? groupDeviceStateColorMapping.get(state) : '#ccc'
  //     const name = state ? groupDeviceStateNameMapping.get(state) : '未知'
  //     return (
  //       <Tooltip title={name}>
  //       <span style={{ color }}>{name}</span>
  //     </Tooltip>
  //   )
  //   }
  // }
]

export default columns
