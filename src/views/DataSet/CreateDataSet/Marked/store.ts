import { atom } from "jotai";
import { EMarked } from "./enums";
import { DatasetScene } from "@src/shared/enum/dataset";
import { S3Uploader } from "@src/components";

const typeURLMapping: Map<DatasetScene, string> = new Map([
  [DatasetScene.Detection, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/detection_example/detection_example.zip'],
  [DatasetScene.Classify, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/classify_example/classify_example.zip'],
  [DatasetScene.CityscapesSegment, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/segmentation_example/segmentation_example.zip'],
  [DatasetScene.PoseDetection, 'https://storage-0l6qoa.s3.cn-northwest-1.amazonaws.com.cn/example/pose_example/pose_example.zip'],
  [DatasetScene.CarPoseDetection, 'https://s3.local.cdn.desauto.net/public/example/detection_3d_example.zip'],
  [DatasetScene.KeyPointsBasedAction, 'https://s3.local.cdn.desauto.net/public/example/action_detection_example.zip'],
  [DatasetScene.KeypointsDetection, 'https://s3.local.cdn.desauto.net/public/example/keypoint_detection_example.zip'],
  [DatasetScene.ImageRetrieval, 'https://s3.local.cdn.desauto.net/public/example/image_retrieval.zip'],
  [DatasetScene.OcrRecognition, 'https://s3.hdd.cdn.desauto.net/public/example/ocr_template.zip']
])

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
  return typeURLMapping.get(scene) || ''
})

export const uploadingAtom = atom<boolean>(false)

export const uploaderRefAtom = atom<React.MutableRefObject<S3Uploader | null> | null>(null)
