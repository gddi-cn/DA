import {currentDatasetIdAtom} from "@src/store/dataset";
import {atomWithRefresh} from "@src/utils/atomCreators";
import datasetAPI from "@src/apis/dataset";
import {atom} from "jotai";
import { processEchartsData } from './processEchartsData'

export const datasetDetailAtom = atomWithRefresh(async (get) => {
  const currentDatasetId = get(currentDatasetIdAtom)
  if (!currentDatasetId) return null

  const {success, data} = await datasetAPI.detail(currentDatasetId)
  if (!success || !data) return null

  return data
})

export const analysisAssessAtom = atomWithRefresh(async (get) => {
  const currentDatasetId = get(currentDatasetIdAtom)
  if (!currentDatasetId) return null

  const {success, data} = await datasetAPI.assess(currentDatasetId)
  if (!success || !data) return null

  return data
})

export const analysisDataListAtom = atom(get => {
  const datasetDetail = get(datasetDetailAtom)
  if (!datasetDetail?.assess) return []

  return processEchartsData(datasetDetail.assess, datasetDetail.scene)
})
