import http from '@src/utils/http'

const groupDeviceAPI = {
  list: async (groupId: Group.Instance['id'], params: GroupDevice.List.Params):
    GroupDevice.List.Response => {
    try {
      const { data } = await http.get(`/v3/devicegroups/${groupId}/devices`, { params })

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
  }
}

export default groupDeviceAPI

