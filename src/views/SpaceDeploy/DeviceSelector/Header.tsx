import { Box } from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { groupSelectorRefAtom, nameAtom, selectedDeviceGroupAtom, sortFilterAtom } from './store'

import { Input as AntInput } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import SortSelector from './SortSelector'
import debounce from 'lodash/debounce'
import GroupSelector from '@src/components/GroupSelector/GroupSelector'
import { RemoteSearchRef } from '@src/components/RemoteSearch/RemoteSearch'
import Register from './Register'
import GenCode from '@src/components/GenCode'
import { selectedChipAtom } from '../store'

const Input = styled(AntInput)`
  width: 208px;
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
  const [name, setName] = useAtom(nameAtom)
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

  React.useEffect(
    () => () => {
      setName('')
    },
    []
  )

  return (
    <Input
      value={localName}
      onChange={e => setLocalName(e.target.value)}
      prefix={<SearchIcon />}
      placeholder='搜索设备名称'
    />
  )
}

const useDeviceGroupSelector = () => {
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useAtom(selectedDeviceGroupAtom)
  const ref = React.useRef<RemoteSearchRef>(null)
  const setRef = useSetAtom(groupSelectorRefAtom)
  const chipId = useAtomValue(selectedChipAtom)

  const handleChange = (value?: DeviceGroupOptions) => {
    setSelectedDeviceGroup(value || null)
  }

  React.useEffect(
    () => {
      setRef(ref)
      return () => {
        setRef(null)
      }
    },
    []
  )

  return {
    ref,
    chipId,
    selectedDeviceGroup,
    handleChange,
  }
}

const DeviceGroupSelector: React.FC = () => {
  const {
    ref,
    chipId,
    selectedDeviceGroup,
    handleChange,
  } = useDeviceGroupSelector()

  return (
    <GroupSelector
      remoteSearchRef={ref}
      value={selectedDeviceGroup}
      onChange={handleChange}
      selectDefault
      chipId={chipId || undefined}
    />
  )
}

const DeviceSorter: React.FC = () => {
  const [sort, setSort] = useAtom(sortFilterAtom)

  return (
    <SortSelector
      sort={sort.sort}
      sortBy={sort.sort_by}
      onChange={(sort, sortBy) => setSort({ sort, sort_by: sortBy })}
    />
  )
}

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        <DeviceGroupSelector />
        <DeviceSorter />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px',
        }}
      >
        <Register />
        <GenCode />
      </Box>
    </Box>
  )
}

export default Header

