import { atom } from "jotai";
import { EMarked } from "./enums";
import { DatasetScene } from "@src/shared/enum/dataset";
import { S3Uploader } from "@src/components";
import {datasetSceneExampleURLMapping} from "@src/shared/mapping/dataset";

export const currentStepAtom = atom<EMarked.Step>(EMarked.Step.SELECT_TRAIN_TYPE)

export const trainTypeAtom = atom<DatasetScene | undefined>(undefined)

export const baseFormAtom = atom<Marked.BaseForm>({
  name: '',
  summary: undefined ,
  cover: undefined,
})

export const proportionAtom = atom<number>(0.2)

export const exampleURLAtom = atom(get => {
  const scene = get(trainTypeAtom)
  if (!scene) return ''
  return datasetSceneExampleURLMapping.get(scene) || ''
})

export const uploadingAtom = atom<boolean>(false)

export const uploaderRefAtom = atom<React.MutableRefObject<S3Uploader | null> | null>(null)
