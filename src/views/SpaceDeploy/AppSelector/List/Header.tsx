import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { Input as AntInput } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useAtom, useSetAtom } from 'jotai'
import debounce from 'lodash/debounce'

import { SecondaryBtn } from '@src/components/Btn'
import { deviceChipOptionAtom, deviceFilterAtom, inputFilterAtom, labelFilterAtom, nameFilterAtom } from '../store'
import DeviceChipSelector from '@src/components/DeviceChipSelector/DeviceChipSelector'
import { AppTemplateInput } from '@src/shared/enum/application'
import AppInputFilter from '@src/components/AppInputFilter/AppInputFilter'
import TemplateLabelFilter from '@src/components/TemplateLabelFilter'

const Input = styled(AntInput)`
  width: 276px;
  border-radius: 19px;
  background: #f7f8fa;
  input {
    background: #f7f8fa;
  }
`

const SearchIcon = styled(SearchOutlined)`
  svg {
    fill: #c8c9cc;
  }
`

const NameFilter: React.FC = () => {
  const [name, setName] = useAtom(nameFilterAtom)
  const [localName, setLocalName] = React.useState<string>(name || '')

  const debouncedSetName = React.useMemo(
    () => debounce((name: string) => {
      setName(name)
    }, 500),
    []
  )

  React.useEffect(
    () => {
      setLocalName(name || '')
    },
    [name]
  )

  React.useEffect(
    () => {
      debouncedSetName(localName)
    },
    [localName]
  )

  return (
    <Input
      value={localName}
      onChange={e => setLocalName(e.target.value)}
      prefix={<SearchIcon />}
      placeholder='搜索应用名称'
    />
  )
}

const _DeviceChipFilter: React.FC = () => {
  const [chipOption, setChipOption] = useAtom(deviceChipOptionAtom)
  const setDeviceFilter = useSetAtom(deviceFilterAtom)

  const handleChange = (newOption?: Device.Chip.Option) => {
    setChipOption(newOption)
    setDeviceFilter(newOption?.value)
  }

  return (
    <Box sx={{ width: 250, overflow: 'hidden' }}>
      <DeviceChipSelector
        value={chipOption}
        onChange={handleChange}
        defaultMostApp
      />
    </Box>
  )
}

const DeviceChipFilter = React.memo(_DeviceChipFilter)

const InputFilter: React.FC = () => {
  const [input, setInput] = useAtom(inputFilterAtom) 

  const handleChange = (newValue: AppTemplateInput) => {
    setInput(newValue)
  }

  return (
    <Box sx={{ width: 171, overflow: 'hidden' }}>
      <AppInputFilter
        value={input}
        onChange={handleChange}
      />
    </Box>
  )
}

const LabelFilter: React.FC = () => {
  const [label, setLabel] = useAtom(labelFilterAtom)

  return (
    <Box width={171}>
      <TemplateLabelFilter
        value={label}
        onChange={v => {
          setLabel(v)
        }}
      />
    </Box>
  )
}

const Header: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" component={'h5'} color='primary' fontWeight={'bold'}>
          推理应用
        </Typography>
        <Button size='small'>
          查看授权记录 &gt;
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: '20px'
        }}
      >
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px',
        }}
        >
          <NameFilter />
          <DeviceChipFilter />
          <InputFilter />
          <LabelFilter />
        </Box>
        <SecondaryBtn>
          创建应用
        </SecondaryBtn>
      </Box>
    </>
  )
}

export default Header
