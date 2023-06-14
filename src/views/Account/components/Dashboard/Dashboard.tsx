import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

import Chat from './Chat'
import { useChatList, useProgressList } from './hook'
import Progress from './Progress'

const ChatList: React.FC = () => {
  const {
    trainUsed,
    trainLimited,
    storageUsed,
    storageLimited,
  } = useChatList()

  return (
    <Box sx={{ display: 'flex', columnGap: '40px' }}>
      <Box width={180} height={180}>
        <Chat
          value={trainUsed}
          total={trainLimited}
          infinity={trainLimited === 0}
          name='训练时长'
          unit='小时'
        />
      </Box>
      <Box width={180} height={180}>
        <Chat
          value={storageUsed}
          total={storageLimited}
          infinity={storageLimited === 0}
          name='存储空间'
          unit='GB'
        />
      </Box>
    </Box>
  )
}

const ProgressList: React.FC = () => {
  const {
    modelAuthUsed,
    modelAuthLimited,
    appDeviceUsed,
    appDeviceLimited,
    modelTrainUsed,
    modelTrainLimited,
    // SDKDeviceUsed,
    // SDKDeviceLimited,
    appAuthUsed,
    appAuthLimited,
  } = useProgressList()

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplate: 'auto/repeat(auto-fit, minmax(150px, 1fr)) ',
        rowGap: '10px',
        columnGap: '40px',
        alignSelf: 'stretch',
        alignItems: 'center'
      }}
    >
      <Progress
        name='模型训练'
        value={modelTrainUsed}
        total={modelTrainLimited}
        unit='个'
        infinity={modelTrainLimited === 0}
      />
      <Progress
        name='设备数量'
        value={appDeviceUsed}
        total={appDeviceLimited}
        unit='台'
        infinity={appDeviceLimited === 0}
      />
      <Progress
        name='应用授权'
        value={appAuthUsed}
        total={appAuthLimited}
        unit='路'
        infinity={appAuthLimited === 0}
      />
      <Progress
        name='模型授权'
        value={modelAuthUsed}
        total={modelAuthLimited}
        unit='个'
        infinity={modelAuthLimited === 0}
      />
      {/* <Progress */}
      {/*   name='SDK 设备' */}
      {/*   value={SDKDeviceUsed} */}
      {/*   total={SDKDeviceLimited} */}
      {/*   unit='台' */}
      {/*   infinity={SDKDeviceLimited === 0} */}
      {/* /> */}
    </Box>
  )
}

const Fallback: React.FC = () => {
  return (
    <Box
      sx={{
        marginTop: '25px', display: 'flex',
        justifyContent: 'center', alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

const Dashboard: React.FC = () => {

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        height: '100%',
      }}
    >
      <Typography variant="subtitle1" component={'h5'} color='primary' fontWeight={'bold'}>
        使用情况
      </Typography>
      <React.Suspense fallback={<Fallback />}>
        <Box
          sx={{
            marginTop: '25px',
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: {
              ll: 'row',
              xs: 'column',
            },
            gap: '40px',
          }}
        >
          <ChatList />
          <ProgressList />
        </Box>
      </React.Suspense>
    </Box>
  )
}

export default Dashboard
