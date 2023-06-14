import { DeviceGroup } from '@src/shared/types/deviceGroup'
import { APIListResponse, APIResponse } from '@src/shared/types/api'
import { DeviceRegisterResult } from '@src/shared/types/device'
import http from '@src/utils/http'
import { DeviceType } from '@src/shared/enum/device'

const getDeviceChipLabel = (label: string, appCount?: number) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </div>
      <div>{appCount || '暂无应用'}</div>
    </div>
  )
}

const deviceAPI = {
  offlineRegister: async (
    groupId: DeviceGroup['id'],
    formData: FormData,
    device_type?: DeviceType,
    device_type_id?: Device.Chip.Instance['key'],
  ): Promise<APIResponse<Array<DeviceRegisterResult>>> => {
    try {
      const { data } = await http.post(
        '/v3/device/offline_register',
        formData,
        { params: { group: groupId, device_type, device_type_id } }
      )
      return {
        success: true,
        data,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  chipTypeList: async (params: Device.Chip.ListParams): Promise<APIListResponse<Device.Chip.Instance>> => {
    try {
      const { data } = await http.get('/v3/device/types_v2', { params })
      return {
        success: true,
        data,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  genAuthCode: async (groupId: number): Promise<APIResponse<string>> => {
    try {
      const { data } = await http.get('/v3/device/auth_code', { params: { group: groupId } })
      return {
        success: true,
        data,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  fetchChipTypeByName: async (name: string): Promise<Array<Device.Chip.Option>> => {
    try {
      const { success, data } = await deviceAPI.chipTypeList({ name, page: 1, page_size: 999 })
      if (!success || !data?.items) return []

      return data.items.map(item => ({ key: item.key, value: item.key, label: item.name }))
    } catch (e) {
      console.error(e)
      return []
    }
  },

  fetchChipTypeByNameOrderByAppCount: async (name: string): Promise<Array<Device.Chip.Option>> => {
    try {
      const { success, data } = await deviceAPI.chipTypeList({ name, page: 1, page_size: 999, detail: true })
      if (!success || !data?.items) return []

      return data.items
        .sort((a, b) => Number(b.app_count) - Number(a.app_count))
        .map(item => ({ key: item.key, value: item.key, label: item.name }))
    } catch (e) {
      console.error(e)
      return []
    }
  },

  fetchChipTypeDetailByName: async (name: string): Promise<Array<Device.Chip.Option & { disabled?: boolean }>> => {
    try {
      const { success, data } = await deviceAPI.chipTypeList({
        name, page: 1,
        page_size: 999,
        detail: true,
      })
      if (!success || !data?.items) return []

      return data.items.map(({ key, name, app_count }) => ({
        key,
        value: key,
        label: getDeviceChipLabel(name, app_count),
        disabled: Number(app_count) <= 0
      }))
    } catch (e) {
      console.error(e)
      return []
    }
  },
}

export default deviceAPI
