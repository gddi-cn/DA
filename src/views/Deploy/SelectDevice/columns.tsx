import { ColumnType } from 'antd/es/table'
import { GroupDevice } from '@src/shared/types/device'
import { formatUnixTime } from '@src/utils/tools'
import { groupDeviceStateColorMapping, groupDeviceStateNameMapping } from '@src/shared/mapping/device'
import { Tooltip } from 'antd'
import { Box, Chip } from '@mui/material'

const columns: Array<ColumnType<GroupDevice>> = [
  {
    title: '设备名称',
    dataIndex: 'name',
    ellipsis: true,
    sorter: true,
    width: 2,
    render: (name: string, device) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: .5 }}>
          <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'noWrap' }}>
            <Tooltip title={name || '-'}>
              <span>{name || '-'}</span>
            </Tooltip>
          </Box>
          {
            device.is_test ? (
              <Box sx={{ flexShrink: 0, lineHeight: 1 }}>
                <Chip
                  label='测试机' size='small'
                  color='secondary' variant='outlined'
                  sx={{ height: 22 }}
                />
              </Box>
            ) : null
          }
        </Box>
      )
    }
  },
  {
    title: '设备 SN',
    dataIndex: 'sn',
    ellipsis: true,
    width: 2,
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
    width: 1,
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
    sorter: true,
    width: 2,
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
    title: '设备状态',
    dataIndex: 'state',
    ellipsis: true,
    width: 1,
    render: (state: GroupDevice['state']) => {
      const color = state ? groupDeviceStateColorMapping.get(state) : '#ccc'
      const name = state ? groupDeviceStateNameMapping.get(state) : '未知'
      return (
        <Tooltip title={name}>
          <span style={{ color }}>{name}</span>
        </Tooltip>
      )
    }
  }
]

export default columns
