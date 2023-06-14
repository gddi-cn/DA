import { Box, Button, Slide, Tooltip, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import defaultCover from './defaultCover.png'
import { ReactComponent as ChipIcon } from './chip.svg'
import { ReactComponent as PicIcon } from './pic.svg'
import { ReactComponent as VideoIcon } from './video.svg'
import { ReactComponent as UncheckIcon } from './uncheck.svg'
import { ReactComponent as CheckedIcon } from './checked.svg'
import { AppTemplateInput } from '@src/shared/enum/application'
import { appTemplateInputNameMapping } from '@src/shared/mapping/application'
import { ReactComponent as RemoveAppIcon } from './remove.svg'

const Cover = styled.img<{ disabled?: boolean }>`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: ${props => props.disabled ? 'grayscale(0.8)' : undefined};
`

export interface AppCardProps extends App.Instance {
  selected?: boolean;
  onSelectedChange?: (app: App.Instance, selected: boolean) => void
  mutiple?: boolean
  onDetail?: (id: App.Instance['id']) => void
  onRemove?: (id: App.Instance['id']) => void
}

const CheckWrap = styled.div`
  line-height: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:hover {
    circle {
      fill: ${darken(.05, '#ffffff')};
    }
    line {
      stroke: ${darken(.05, '#62B0E5')}
    }
  }
  &:active {
    circle {
      fill: ${darken(.1, '#ffffff')};
    }
    line {
      stroke: ${darken(.1, '#62B0E5')}
    }
  }
`

const AppCard: React.FC<AppCardProps> = (
  {
    
    selected = false,
    mutiple = false,
    onSelectedChange,
    onDetail,
    onRemove,
    ...app
  }
) => {
  const {
    id,
    cover,
    name,
    adapter_device,
    input,
    invalid,
    template_name,
  } = app

  const [hover, setHover] = React.useState<boolean>(false)

  return (
    <Box
      onClick={() => {
        if (invalid) return
        onSelectedChange && onSelectedChange(app as App.Instance, !selected)
      }}
      sx={{
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        cursor: invalid ? 'normal' : 'pointer',
        outline: selected && !mutiple
          ? '2px solid #62b0e5'
          : '0px solid transparent',
        '&:hover': invalid || (selected && !mutiple) ? undefined : {
          outline: '1px solid rgba(72, 162, 223, .5)',
        },
        transition: 'outline .2s ease-in-out'
      }}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <Box sx={{ position: 'relative', height: 140 }}>
        <Cover alt='cover' src={cover || defaultCover} disabled={invalid} />
        {
          mutiple ? (
            <Box
              sx={{
                top: '10px',
                left: '10px',
                position: 'absolute',
              }}
            >
              {
                selected
                ? <CheckedIcon />
                : <UncheckIcon />
              }
            </Box>
          ) : null
        }
        {
          invalid ? (
            <Box
              sx={{
                height: 8,
                width: 8,
                borderRadius: 8,
                backgroundColor: '#ff6177',
                top: '10px',
                right: '10px',
                position: 'absolute',
              }}
            />
          ) : null
        }
        {
          onRemove ? (
            <CheckWrap onClick={() => onRemove(id)} title='移除'>
              <RemoveAppIcon />
            </CheckWrap>
          ) : null
        }
      </Box>
      <Box
        height={114} overflow={'hidden'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '10px',
          px: '20px',
          py: '16px',
          backgroundColor: theme => invalid ? '#f8f8f8' : theme.palette.blue.main
        }}
      >
        <Typography
          noWrap
          sx={{
            color: invalid ? '#888' : '#2582c1',
            fontSize: 18,
            fontWeight: 600,
            lineHeight: '20px',
          }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            columnGap: '8px',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              columnGap: '2px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                lineHeight: 1,
                '& > svg': {
                  display: 'block',
                  'line, rect': {
                    stroke: invalid ? '#888' : undefined,
                  }
                }
              }}
            >
            <ChipIcon />
            </Box>
            <Box overflow={'hidden'}>
              <Tooltip title={adapter_device} placement='right'>
                <Typography
                  noWrap
                  sx={{
                    flexGrow: 1,
                    color: invalid ? '#888' : '#2582c1',
                    fontSize: '14px',
                    fontWeight: 400, lineHeight: '20px',
                  }}
                >
                  {adapter_device}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '2px',
            }}
          >
            <Box
              sx={{
                lineHeight: 1,
                '& > svg': {
                  display: 'block',
                  'line, rect, path': {
                    stroke: invalid ? '#888' : undefined,
                  },
                  'ellipse': {
                    fill: invalid ? '#888' : undefined,
                  }
                }
              }}
            >
            {
              input === AppTemplateInput.VIDEO_STREAM
              ? <VideoIcon />
              : <PicIcon />
            }
            </Box>
            <Box overflow={'hidden'}>
              <Typography
                noWrap
                sx={{
                  flexGrow: 1,
                  color: invalid ? '#888' : '#2582c1',
                  fontSize: '14px',
                  fontWeight: 400, lineHeight: '20px',
                }}
              >
                {
                  appTemplateInputNameMapping.get(input) || '--'
                }
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              backgroundColor: '#2582c1',
              fontSize: '14px',
              py: '4px',
              borderRadius: '22px',
              color: '#fff',
              px: '10px',
              display: 'inline',
              lineHeight: 1,
            }}
          >
            {template_name}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
        }}
      >
        <Slide
          in={hover}
          direction='up'
        >
          <Box
            height={48}
            sx={{
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'white.main'
            }}
          >
            <Button
              variant='outlined' sx={{ width: 97 }} size='small'
              onClick={e => {
                e.stopPropagation()
                onDetail && onDetail(id)
              }}
            >
              查看
            </Button>
          </Box>
        </Slide>
      </Box>
    </Box>
  )
}

export default AppCard
