import React from 'react'

import { Tag } from 'antd';

export const useGetTableParams = ({ data }: { data?:any}) => {
  const columns = [
    {
      title: '设备名',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '文件名',
      dataIndex: 'filename',
      key: 'filename',
      ellipsis: true,
    },
    {
      title: '设备SN',
      dataIndex: 'sn',
      key: 'sn',
      ellipsis: true,
    },
    {
      title: '芯片',
      dataIndex: 'chip',
      key: 'chip',
      ellipsis: true,
    },
    {
      title: '原因',
      key: 'result',
      dataIndex: 'result',
      render: (result:any) => {
        // string
        // // 注册结果(Success-成功，Repeated-设备重复，Unsupported-不支持该芯片类型的设备)
        const objText: any = {
          Repeated: '设备重复',
          Unsupported: '不支持该芯片类型的设备',

        }
        const getcolor = () => {
          return '#f50'
        }
        return (
          <Tag color={getcolor()}>
            {objText[result] || '未授权'}

          </Tag>
        )
      }

    },

  ];

  return {
    columns, dataSource: data
  }
}
