
export const MODEL_TYPES = {
  detection: '检测',
  classify: '分类',
  // face_detection: '人脸检测',
  // face_recognition: '人脸识别',
  cityscapes_segment: '通用分割',
  portrait_segment: '肖像分割',
  pose_detection: '姿态检测',
  monocular_3d_detection: '单目3D'
}

export type ModelTypes = typeof MODEL_TYPES
