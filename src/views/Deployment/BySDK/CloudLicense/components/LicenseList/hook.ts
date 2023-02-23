import React from 'react'
import { useAtom } from 'jotai'
import produce from 'immer'

import { LicenseType } from '@src/shared/enum/license'
import { License } from '@src/shared/types/license'

import { idAtom, versionIdAtom } from '../../store'
import modelAPI from '@src/apis/model'
import { cloudLicenseListAtom } from './store'

export const fetchDeviceLicenseList = async (id: string, versionId: string): Promise<Array<License>> => {
  const { success, data } = await modelAPI.fetchLicenseList(id, versionId, undefined, LicenseType.CLOUD)

  if (!success || !data) return []

  return data
}

export const useListData = () => {
  const [id] = useAtom(idAtom)
  const [versionId] = useAtom(versionIdAtom)
  const [cloudLicenseList, setCloudLicenseList] = useAtom(cloudLicenseListAtom)

  React.useEffect(
    () => {
      console.table([id, versionId])
      if (!id || !versionId) return

      fetchDeviceLicenseList(id, versionId)
        .then((data) => {
          setCloudLicenseList(produce(_ => data))
        })
    },
    [id, versionId]
  )

  return {
    noData: cloudLicenseList.length <= 0,
  }
}

export const useReload = () => {
  const [id] = useAtom(idAtom)
  const [versionId] = useAtom(versionIdAtom)
  const [, setCloudLicenseList] = useAtom(cloudLicenseListAtom)

  return () => {
    if (!id || !versionId) return
    fetchDeviceLicenseList(id, versionId)
      .then((data) => {
        setCloudLicenseList(produce(_ => data))
      })
  }
}
