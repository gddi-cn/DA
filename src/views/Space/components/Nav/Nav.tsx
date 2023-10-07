import { Box, Divider, Paper, Skeleton, Typography, styled } from '@mui/material'
import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/DashboardOutlined';

import { Paths } from '@src/shared/enum/paths'
import { ReactComponent as ApiIcon } from '@src/asset/spaceNavi/api.svg'
import { ReactComponent as ApiActiveIcon } from '@src/asset/spaceNavi/api_active.svg'
import { ReactComponent as DeviceIcon } from '@src/asset/spaceNavi/device.svg'
import { ReactComponent as DeviceActiveIcon } from '@src/asset/spaceNavi/device_active.svg'
import { ReactComponent as DeployIcon } from '@src/asset/spaceNavi/deploy.svg'
import { ReactComponent as DeployActiveIcon } from '@src/asset/spaceNavi/deploy_active.svg'

import { useNav } from './hook'
import { userUsageAtom } from '@src/store/user'
import { useAtomValue } from 'jotai'
import Scrollbars from 'react-custom-scrollbars'
import { formatUinxTime } from '@src/utils'
import IconLabelAlt from "@src/icons/LabelAlt";

const Wrap = styled(Paper)`
  height: 100%;
  width: 248px;
`

const Container = styled(Box)`
  padding: 24px 20px;
  border-radius: 8px;
`

const A = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 10px',
  columnGap: 10,
  borderRadius: '4px',
  color: theme.palette.text.primary,
  transition: 'background-color 0.2s linear',
  '&:hover:not([selected])': {
    backgroundColor: theme.palette.hoverBlue.main,
    cursor: 'pointer',
    color: theme.palette.text.primary,
  },
  '&[selected]': {
    backgroundColor: theme.palette.selectedBlue.main,
    color: '#fff',
    '& svg': {
      "line, rect, path": {
        stroke: '#fff',
      }
    }
  }
}))

const Link: React.FC<{
  path: string,
  name: string,
  Icon: React.ReactNode,
  ActiveIcon?: React.ReactNode,
  marginTop?: React.CSSProperties['marginTop'],
}> = (
  {
    path,
    name,
    Icon,
    ActiveIcon,
    marginTop,
  }
) => {
    const navigate = useNavigate()
    const match = useMatch(path)
    const ref = React.useRef<HTMLAnchorElement>(null)

    const handleClick = () => {
      match || navigate(path)
    }

    React.useEffect(
      () => {
        if (match) {
          ref.current?.setAttribute('selected', '')
        } else {
          ref.current?.removeAttribute('selected')
        }
      },
      [match]
    )

    return (
      <A
        ref={ref} component='a'
        onClick={handleClick}
        sx={{
          marginTop,
        }}
      >
        {
          match ? (ActiveIcon || Icon) : Icon
        }
        <Typography fontWeight={match ? 'bold' : undefined}>
          {name}
        </Typography>
      </A>
    )
  }

const AccountWrap = styled(Box)(({ theme }) => ({
  display: 'block',
  padding: '20px 10px',
  backgroundColor: theme.palette.blue.main,
  borderRadius: '4px',
  transition: 'outline-color 0.2s ease-in-out',
  outlineColor: 'transparent',
  '&:hover:not([selected])': {
    cursor: 'pointer',
  },
  '&[selected]': {
    outline: `1px solid ${theme.palette.selectedBlue.main}`
  }
}))

const Balance: React.FC = () => {
  const usage = useAtomValue(userUsageAtom)

  return (
    <Typography variant='body1' component='h4' color='primary.main' noWrap>
      {usage?.balance || '--'}
    </Typography>
  )
}

const Expire: React.FC = () => {
  const usage = useAtomValue(userUsageAtom)

  return (
    <Typography variant='body1' component='h4' color='primary.main' noWrap>
      {usage?.expire ? formatUinxTime(usage.expire) : '--'}
    </Typography>
  )
}

const BalanceFallback: React.FC = () => {
  return (
    <Skeleton variant='text' width={100} />
  )
}

const Nav: React.FC = () => {
  const {
    greeting,
    nickname,
  } = useNav()

  return (
    <Wrap elevation={0}>
      <Scrollbars autoHide>
        <Container>
          <Typography variant='h5' component='h3'>{greeting}!</Typography>
          <Typography variant='h5' component='h3' noWrap>{nickname}</Typography>
          <Box sx={{ mt: 2.5 }} component='nav'>
            {/*<Account />*/}
            <Link
              path={Paths.Space.ACCOUNT}
              name={'账户'}
              Icon={<DashboardIcon sx={{ fontSize: 20 }} />}
            />
            <Link
              Icon={<ApiIcon />}
              ActiveIcon={<ApiActiveIcon />}
              path={Paths.Space.API}
              name='API Key'
              marginTop='20px'
            />
            <Divider sx={{ borderColor: t => t.palette.blue.main, marginTop: '10px' }} />
            <Link
              Icon={<DeviceIcon />}
              ActiveIcon={<DeviceActiveIcon />}
              path={Paths.Space.DEVICE}
              name='设备中心'
              marginTop='10px'
            />
            <Link
              Icon={<DeployIcon />}
              ActiveIcon={<DeployActiveIcon />}
              path={Paths.Space.DEPLOY}
              name='生产部署'
              marginTop='20px'
            />
            <Link
              Icon={<IconLabelAlt style={{ color: '#000', fontSize: '22px' }} />}
              ActiveIcon={<IconLabelAlt style={{ color: '#fff', fontSize: '22px' }} />}
              path={Paths.Layout.LABELING}
              name='自动化标注'
              marginTop='20px'
            />
          </Box>
        </Container>
      </Scrollbars>
    </Wrap>
  )
}

export default Nav

