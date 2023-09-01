import { Box, Grid, List, ListItem, Skeleton, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'

import { consumesAtom } from './store'
import { formatUinxTime } from '@src/utils'
import { consumeTypeNameMapping } from '@src/shared/mapping/user'
import { User as EUser } from '@src/shared/enum/user'
import Empty from '@src/components/Empty'

const getAmount = (type: EUser.Consume.Type, amount: number) => {
  amount = amount || 0

  if (type === EUser.Consume.Type.CALCULATE) {
    return `${(amount / 60).toFixed(1)} 小时`
  }

  if (type === EUser.Consume.Type.AUTH) {
    return `${amount} 个`
  }

  if (type === EUser.Consume.Type.CHANNEL) {
    return `${amount} 路`
  }

  if (type === EUser.Consume.Type.MODEL_TRAIN) {
    return `${amount} 个`
  }

  if (
    type === EUser.Consume.Type.ONLINE_DEVICE_RFEGISTER
    || type === EUser.Consume.Type.OFFLINE_DEVICE_REGISTER
  ) {
    return `${amount} 台`
  }

  return '-'
}

const useRecord = () => {
  const [{ items: consumeList }, refresh] = useAtom(consumesAtom)

  React.useEffect(
    () => {
      refresh()
    },
    []
  )

  return {
    consumeList,
  }
}



const Item: React.FC<User.Consume.Instance> = (
  {
    created,
    consume_type,
    amount,
  }
) => {
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={4}>
          <Typography>
            {formatUinxTime(created)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            {consumeTypeNameMapping.get(consume_type) || '-'}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ color: 'error.main', fontWeight: 700 }}>
            {getAmount(consume_type, amount)}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  )
}

const Inner: React.FC = () => {
  const {
    consumeList,
  } = useRecord()

  if (!consumeList.length) return (
    <Empty
      tip={
        <Typography
          variant='h6'
          component='p'
          sx={{
            mt: '40px',
          }}
        >
          暂无历史记录
        </Typography>
      }
    />
  )

  return (
    <List
      sx={{
        '& .MuiListItem-root': {
          color: '#606266',
          padding: '12px',
          '&:not(:last-of-type)': {
            borderBottom: '1px solid rgba(98, 176, 229, .5)'
          },
          '&:first-of-type': {
            fontWeight: 500,
            color: '#061926',
          },
          '.MuiTypography-root': {
            fontSize: '14px',
          },
        },

      }}
    >
      <ListItem>
        <Grid container>
          <Grid item xs={4}>
            <Typography>时间</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>类型</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>额度</Typography>
          </Grid>
        </Grid>
      </ListItem>
      {
        consumeList.map((consume) => (
          <Item {...consume} key={consume.id} />
        ))
      }
    </List>
  )
}

const Fallback: React.FC = () => {
  return (
    <Box>
      {
        new Array(11).fill(0).map((_, index) => (
          <Skeleton width='100%' key={index} height={46} />
        ))
      }
    </Box>
  )
}

const Record: React.FC = () => {
  return (
    <React.Suspense fallback={<Fallback />}>
      <Inner />
    </React.Suspense>
  )
}

export default Record

