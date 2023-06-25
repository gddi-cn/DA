import http from '@src/utils/http'

const appFlowAPI = {
  getModuleDefinition: async (version: string) => {
    try {
      const { data: { url } } = await http.get(
        `/v3/moduleDefinitions/${version}`,
        {
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      )

      if (!url) {
        return {
          succes: false,
        }
      }

      const data = await http.get(url)

      if (!data) {
        return {
          succes: false,
        }
      }

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

  getDefaultVersion: async (): Promise<{ success: boolean, data?: AppFlow.ModuleDefinition.Version }> => {
    try {
      const { data } = await http.get('/v3/moduleDefinitions/default')
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

  getDefaultConfig: async () => {
    try {
      const { success, data } = await appFlowAPI.getDefaultVersion()
      if (!success || !data) {
        return {
          success: false,
        }
      }

      const { version, url } = data

      const moduleDefinitions = await http.get(url)

      if (!moduleDefinitions) {
        return {
          success: false,
        }
      }

      return {
        success: true,
        data: {
          moduleDefinitions,
          version
        }
      }

    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  getDefailtConfigByApp: async (url: App.Instance['config_url']) => {
    try {
      const defaultValue = await http.get(url)
      if (!defaultValue?.version) {
        return {
          success: false,
        }
      }

      const { success, data } = await appFlowAPI.getModuleDefinition(defaultValue.version)

      if (!success || !data) {
        return {
          success: false,
        }
      }

      return {
        success: true,
        data: {
          pipeline: defaultValue,
          moduleDefinitions: data,
        }
      }

    } catch (e) {
      console.error(e)

      return {
        success: false,
      }
    }
  },
}

export default appFlowAPI

