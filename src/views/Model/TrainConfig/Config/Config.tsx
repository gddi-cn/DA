import React from 'react'
import styled from 'styled-components'
import {InputNumber, Radio, Switch, Tooltip} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import InfoIcon from '@ant-design/icons/InfoCircleOutlined'
import Box from '@mui/material/Box'

import { ChipConfigType } from '@src/shared/enum/chip'
import { chipConfigNameMapping } from '@src/shared/mapping/chip'
import {useParamsSetting, useResolution} from './hook'

const Header = styled.div`
  display: flex;
  align-items: baseline;
  column-gap: 8px;
  margin-bottom: 4px;
`

const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: 4px;
`

const Tip = styled.div`
  width: 188px;
  padding: 4px;
  display: flex;
  color: #fad514;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  span {
    display: block;
    padding: 4px 6px;
  }
  p {
    flex: 1;
  }
`

const FixedTip = styled.p`
  padding: 4px 0;
  font-weight: 400;
  font-size: 12px;
  color: #8f8fff;
`

const Suffix = styled.span`
  color: #48A2DF;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`

const WarnTip: React.FC<{ tip: string }> = (
  {
    tip
  }
) => {
  return (
    <Tip>
      <InfoCircleOutlined />
      <p>{tip}</p>
    </Tip>
  )
}


const Resolution: React.FC = () => {
  const {
    limit,
    resolution,
    options,
    disabled,
    handleChange,
    fixed,
  } = useResolution()

  return (
    <div>
      <Header>
        <Label htmlFor={'resolution_selector'}>训练尺寸</Label>
        <Tooltip
          title={
            '即进行训练及推理的图像分辨率，如640即640px * 640px；' +
            '数值越大，模型可支持检测的目标更小，但模型的体量、耗费算力也会相应增加。' +
            '如果检测目标较小，可适当选择较大尺寸，非必要请勿随意修改。'
          }
          placement={'right'}
        >
          <InfoIcon />
        </Tooltip>
      </Header>
      <Radio.Group
        id={'resolution_selector'}
        disabled={disabled}
        onChange={handleChange}
        value={resolution}
      >
        {
          options.map(({ key, label, value }) => (
            <Radio key={key} value={value} disabled={value > limit}>{label}</Radio>
          ))
        }
      </Radio.Group>
      <FixedTip>
        {
          fixed ? '已根据数据情况为您选择训练尺寸' : '\u2000'
        }
      </FixedTip>
    </div>
  )
}

const Config: React.FC = () => {
  const {
    disableInput, disableCustom, showTip, tip,
    cardNum, handleCardNumChange,
    configType, handleTypeChange,
    configFps, handleFpsChange,
    configConcurrent, handleConcurrentChange,
    showClip,
    disabledClip,
    clip,
    handleClipChange,
  } = useParamsSetting()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 4,
      }}
    >
      <div>
        <Header>
          <Label htmlFor={'card_num_input'}>多卡训练</Label>
          <Tooltip title={'使用多GPU进行训练。多卡训练模式能让模型训练更加高效，提升模型精度。'} placement={'right'}>
            <InfoIcon />
          </Tooltip>
        </Header>
        <Tooltip open={showTip} color={'#fff'} title={<WarnTip tip={tip} />} placement={'right'}>
          <InputNumber
            id={'card_num_input'}
            value={cardNum}
            onChange={(v) => handleCardNumChange(v as (number | null))}
            min={1}
            precision={0}
            style={{ width: '300px' }}
          />
        </Tooltip>
      </div>
      <div>
        <Radio.Group value={configType} onChange={handleTypeChange}>
          {
            Object.values(ChipConfigType)
              .map((t: ChipConfigType) => (
                <Radio value={t} key={t}>
                  {chipConfigNameMapping.get(t) || ''}
                </Radio>
              ))
          }
        </Radio.Group>
      </div>
      <Resolution />
      <div>
        <Header>
          <Label htmlFor={'fps_input'}>帧率设置</Label>
          <Tooltip
            title={
              '即 FPS，指单个模型一秒处理的帧数，FPS 数值越大，模型越小。如 25 FPS 即能达到实时推理效果。'
            }
            placement={'right'}
          >
            <InfoIcon />
          </Tooltip>
        </Header>
        <InputNumber
          min={1} id={'fps_input'} disabled={disableInput} addonAfter={<Suffix>FPS</Suffix>}
          value={configFps} onChange={v => handleFpsChange(v as (number | null))}
          style={{ width: '300px', color: '#aaeeaa' }}
          precision={0}
        />
      </div>
      <div>
        <Header>
          <Label htmlFor={'fps_input'}>算法并行数</Label>
          <Tooltip
            title={
              '并行数是指在同一个设备上，需要并行该种算法的个数，并行数数值越大，模型越小。' +
              '如并行数为 2，是指同一时刻，能够支持两个此模型同时处理数据。'
            }
            placement={'right'}
          >
            <InfoIcon />
          </Tooltip>
        </Header>
        <InputNumber
          min={1} id={'concurrent_input'} disabled={disableInput}
          value={configConcurrent}
          onChange={(v) => handleConcurrentChange(v as (number | null))}
          style={{ width: '300px' }}
          precision={0}
        />
      </div>
      {
        showClip ? (
          <div>
            <Header>
              <Label htmlFor={'clip_switch'}>开启切图</Label>
              <Tooltip
                title={
                  '适用于大尺寸图片识别小目标场景。开启后，平台将根据所选芯片算力确定切分策略，对图片进行切分，' +
                  '能够保证模型效果较优，但模型推理速度的会变慢，无法保证实时推理。' +
                  '不开启时，模型效果会受到影响，但能保证推理速度。'
                }
                placement={'right'}
              >
                <InfoIcon />
              </Tooltip>
            </Header>
            <Switch
              disabled={disabledClip || disableInput}
              id={'clip_switch'}
              checked={clip}
              onChange={handleClipChange}
            />
          </div>
        ) : null
      }
    </Box>
  )
}

export default Config
