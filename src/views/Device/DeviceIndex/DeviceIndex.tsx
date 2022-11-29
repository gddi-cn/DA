
import { Select, message, Popover, Input } from 'antd'
import { GSelect, ModelOpreationTitle, GIconInput, GButton } from '@src/UIComponents'
import DeviceTable from './DeviceTable'
import api from '@api'
import { isNil } from 'lodash';
import MobileDynamicCode from './MobileDynamicCode'
import MarginalEndGetCode from './MarginalEndGetCode'
import MarginalEndRegisterForm from './MarginalEndRegisterForm'
import EndUploadGxtBtn from './EndUploadGxtBtn'
import { useState, useEffect, useCallback, useDeferredValue, useMemo } from 'react';
import AddGroup from './AddGroup'
import './DeviceIndex.module.less'
import { DeviceType } from '@src/shared/enum/device'

const { Option } = Select;

type OptionsT = Array<any>

const optionsList: OptionsT = [
  { label: '移动端', value: 'Mobile' },
  { label: '边缘端', value: 'Edge' },
  { label: '终端', value: 'Terminal' }
]

const DeviceIndex = (): JSX.Element => {
  const [deviceType, setDeviceType] = useState<string>('Edge')
  const [groupSelected, setGroupSelected] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<Array<any>>([])
  const [dataSource, setDataSource] = useState<Array<any>>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [deviceName, setDeviceName] = useState<string|undefined>()
  const [popoverVisible, setPopoverVisible] = useState(false)

  const deferDeviceName = useDeferredValue(deviceName)

  const fetchGroups = useCallback(
    async () => {
      try {
        setLoading(true)
        const res = await api.get('/v3/devicegroups', {
          params: { page: 1, type: deviceType, page_size: 1000 }
        })
        if (res.code === 0) {
          const { items } = res.data
          setOptions(items || [])

          if ((items || []).some((x: any) => x.id === 0)) {
            setGroupSelected(0)
          }

        } else {
          message.error(res?.message)
        }
      } catch (e) {

      } finally {
        setLoading(false)
      }
    }, [deviceType]
  )

  useEffect(
    () => {
      fetchGroups()
    }, [fetchGroups]
  )

  const fetchDeviceList = useCallback(
    async () => {
      if (isNil(groupSelected)) {
        return
      }

      try {
        setTableLoading(true);
        const res = await api.get(`/v3/devicegroups/${groupSelected}/devices`, {
          params: {
            page: 1,
            page_size: 1000,
            sort_by_expire: undefined,
            sort_by_status: undefined,
            name: deferDeviceName,
            type: (groupSelected === 0 || groupSelected === '0') ? deviceType: undefined
          }
        })
        if (res.code === 0) {
          const { items } = res.data
          setDataSource(items || [])
          setTableLoading(false)
        }
      } catch (e) {
        console.log(e, 111)
        setTableLoading(false)
      }

      // setDataSource(data.results)
      // setPagination({
      //   ...params.pagination,
      //   total: 200
      // })
    }, [groupSelected, deferDeviceName, deviceType]
  )

  useEffect(() => {
    fetchDeviceList()
  }, [fetchDeviceList])

  const reset = () => {
    setGroupSelected(undefined)
    setDeviceName(undefined)
    setDataSource([])
  }

  const handleDeviceTypeChange = (v:string) => {
    setDeviceType(v)
    reset()
  }

  const handleGroupChange = (v: string) => {
    setGroupSelected(v)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setDeviceName(inputValue)
  }

  const AddBtnOfMobile = useMemo(() => {
    const handleVisibleChange = (visible: boolean) => {
      setPopoverVisible(visible);
    };
    return (
      <Popover
        content={<MobileDynamicCode group={groupSelected} />}
        title={null}
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={handleVisibleChange}
        getPopupContainer={(triggerNode: HTMLElement) => (triggerNode as any).parentNode}
      >
        <GButton type='primary' className='device_btn'>添加设备</GButton>
      </Popover>

    )
  }, [popoverVisible, groupSelected])

  const AddBtnOfEdge = useMemo(() => {
    const handleVisibleChange = (visible: boolean) => {
      if (!groupSelected && groupSelected !== 0) {
        message.warning('请选择设备组')
        return
      }
      setPopoverVisible(visible);
    };
    return (
      <Popover
        content={<MarginalEndGetCode groupSelected={groupSelected} />}
        title={null}
        trigger="click"
        placement='bottom'
        visible={popoverVisible}
        onVisibleChange={handleVisibleChange}
        destroyTooltipOnHide
        getPopupContainer={(triggerNode: HTMLElement) => (triggerNode as any).parentNode}
      >

        <GButton type='primary' className='device_btn'>获取在线注册码</GButton>
      </Popover>

    )
  }, [popoverVisible, groupSelected])

  const BtnWrapOfEdge = useMemo(
    () => {
      return (
        <>
          <MarginalEndRegisterForm deviceType={deviceType} groupSelected={groupSelected} callBack={fetchDeviceList} />
          {AddBtnOfEdge}

        </>
      )
    }, [AddBtnOfEdge, groupSelected, fetchDeviceList]
  )

  const AddBtnOfEnd = useMemo(
    () => {
      return (
        <EndUploadGxtBtn key='注册设备' deviceType={deviceType} groupSelected={groupSelected} callBack={fetchDeviceList} />
      )
    }, [groupSelected, fetchDeviceList]
  )

  const RegisterView = useMemo(
    () => {
      if (deviceType === 'Mobile') {
        return AddBtnOfMobile
      }

      if (deviceType === 'Edge') {
        return (
          <>
            {BtnWrapOfEdge}
          </>
        )
      }

      return AddBtnOfEnd
    }, [deviceType, AddBtnOfMobile, BtnWrapOfEdge, AddBtnOfEnd]
  )
  return (
    <div styleName='DeviceIndex'>
      <div className='title'>设备中心</div>
      <div className='DeviceIndex_wrap'>
        <div className='select_params_wrap'>
          <div className='select_block'>
            <ModelOpreationTitle text='设备类型'></ModelOpreationTitle>
            <div className='select_wrap'>
              <GSelect value={deviceType} onChange={handleDeviceTypeChange} >
                {
                  optionsList.map((o, i) => {
                    return (
                      <Option key={i} value={o.value}>{o.label}</Option>
                    )
                  })
                }

              </GSelect>
            </div>
          </div>
          <div className='select_block'>
            <ModelOpreationTitle text={<AddGroup fetchGroups={fetchGroups} deviceType={deviceType}/>}></ModelOpreationTitle>
            <div className='select_wrap'>
              <GSelect value={groupSelected} onChange={handleGroupChange} placeholder='请选择设备组' loading={loading}>
                {
                  options.map((o: any, i: number) => {
                    return (
                      <Option key={i} value={o.id}>{o.name}</Option>
                    )
                  })
                }

              </GSelect>
            </div>
          </div>
        </div>
        <div className='device_grid_wrap'>
          <div className='search_header'>
            <div className='name_input_wrap'>
              <GIconInput placeholder='搜索设备名称' onChange={handleInputChange} value={deviceName}/>
              {/*<Input onChange={handleInputChange} value={deferDeviceName} />*/}
            </div>
            <div className='add_device_wrap'>
              {RegisterView}
            </div>
          </div>
          <div className='table_wrap'>
            <DeviceTable dataList={dataSource} tableLoading={tableLoading} groupSelected={groupSelected} fetchDeviceList={fetchDeviceList} deviceType={deviceType}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceIndex
