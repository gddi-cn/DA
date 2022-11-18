import React from 'react'
import bg from '../../assets/device_list_empty.png'
import { Typography } from 'antd'

const NoData: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 55,
        marginTop: 3,
      }}
    >
      <img src={bg} style={{ width: 260, height: 200 }} alt={'no data'} />
      <Typography.Paragraph
        style={{
          marginTop: 40,
          marginBottom: 0,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        暂无已授权设备
      </Typography.Paragraph>
      <Typography.Paragraph
        style={{
          marginTop: 10,
          marginBottom: 0,
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        快点击下方按钮，申请授权你的设备吧～
      </Typography.Paragraph>
    </div>
  )
}

export default NoData
