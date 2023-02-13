import { useAtom } from 'jotai'
import React from 'react'
import {
  deviceCurrentTabAtom,
  edgeDeviceListAtom,
  edgeNameAtom,
  edgePageAtom,
  edgePageSizeAtom,
  edgeTotalAtom,
  fetchingEdgeAtom,
  fetchingTerminalAtom, selectedEdgeDeviceIdListAtom,
  selectedTerminalGroupAtom,
  selectedTerminalDeviceIdListAtom,
  terminalDeviceListAtom,
  terminalNameAtom,
  terminalPageAtom,
  terminalPageSizeAtom,
  terminalTotalAtom,
  selectedEdgeGroupAtom,
  deviceTypeListAtom,
} from './store'

import { DeviceType } from '@src/shared/enum/device'

const useResetStore = () => {
  const [, setTab] = useAtom(deviceCurrentTabAtom)
  const [, setEdgeDeviceGroup] = useAtom(selectedEdgeGroupAtom)
  const [, setDeviceGroupId] = useAtom(selectedTerminalGroupAtom)
  const [, setTList] = useAtom(terminalDeviceListAtom)
  const [, setTName] = useAtom(terminalNameAtom)
  const [, setTPage] = useAtom(terminalPageAtom)
  const [, setTPageSize] = useAtom(terminalPageSizeAtom)
  const [, setTTotal] = useAtom(terminalTotalAtom)
  const [, setTLoading] = useAtom(fetchingTerminalAtom)
  const [, setEList] = useAtom(edgeDeviceListAtom)
  const [ ,setEName] = useAtom(edgeNameAtom)
  const [, setEPage] = useAtom(edgePageAtom)
  const [, setEPageSize] = useAtom(edgePageSizeAtom)
  const [, setETotal] = useAtom(edgeTotalAtom)
  const [, setELoading] = useAtom(fetchingEdgeAtom)
  const [, setSelectedTDevice] = useAtom(selectedTerminalDeviceIdListAtom)
  const [, setSelectedEDevice] = useAtom(selectedEdgeDeviceIdListAtom)
  const [, setDeviceTypeList] = useAtom(deviceTypeListAtom)

  return () => {
    setTLoading(true)
    setELoading(true)
    setTab(DeviceType.EDGE)
    setDeviceGroupId(null)
    setEdgeDeviceGroup(null)
    setTList([])
    setTName('')
    setTPage(1)
    setTPageSize(10)
    setTTotal(0)
    setEList([])
    setEName('')
    setEPage(1)
    setEPageSize(10)
    setETotal(0)
    setSelectedTDevice([])
    setSelectedEDevice([])
    setDeviceTypeList([])
    setELoading(false)
    setTLoading(false)
  }
}

export const useDevice = () => {
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const [currentTab, setCurrentTab] = useAtom(deviceCurrentTabAtom)

  const showTerminal = currentTab === DeviceType.TERMINAL
  const showEdge = currentTab === DeviceType.EDGE

  const resetStore = useResetStore()

  const handleTabChange = (key: string)  => {
    setCurrentTab(key as DeviceType.TERMINAL | DeviceType.EDGE)
  }

  React.useEffect(() => resetStore, [])

  React.useEffect(
    () => {
      const $c = contentRef.current
      if (!$c) return

      if (currentTab === DeviceType.TERMINAL) {
        $c.setAttribute('terminal', '')
      } else {
        $c.removeAttribute('terminal')
      }
    },
    [currentTab]
  )

  return {
    contentRef,
    showTerminal,
    showEdge,
    handleTabChange,
  }
}
