import React from 'react'
import { useAtom } from 'jotai'
import produce from 'immer'

import { LicenseType } from '@src/shared/enum/license'
import { License } from '@src/shared/types/license'

import { deviceLicenseListAtom, idAtom, versionIdAtom } from '@views/Deployment/BySDK/DeviceLicense/store'
import modelAPI from '@src/apis/model'

export const fetchDeviceLicenseList = async (id: string, versionId: string): Promise<Array<License>> => {
  const { success, data } = await modelAPI.fetchLicenseList(id, versionId, undefined, LicenseType.SDK)

  if (!success || !data) return []

  return data
}

export const useListData = () => {
  const [id] = useAtom(idAtom)
  const [versionId] = useAtom(versionIdAtom)
  const [deviceLicenseList, setDeviceLicenseList] = useAtom(deviceLicenseListAtom)

  React.useEffect(
    () => {
      if (!id || !versionId) return
      fetchDeviceLicenseList(id, versionId)
        .then((data) => {
          setDeviceLicenseList(produce(_ => data))
        })
    },
    [id, versionId]
  )

  return {
    noData: deviceLicenseList.length <= 0,
  }
}
