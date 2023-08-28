
export const MODEL_TYPES = {
  detection: '目标检测',
  classify: '图片分类',
  // face_detection: '人脸检测',
  // face_recognition: '人脸识别',
  cityscapes_segment: '通用分割',
  // TODO 隱藏和顯示動作識別
  keypoints_based_action: '动作识别',
  // portrait_segment: '肖像分割',
  pose_detection: '姿态检测',
  car_pose_detection: '单目3D检测',
  // monocular_3d_detection: '单目3D检测'
  // [WARNING] 仅在测试环境开放
  keypoint_detection: '关键点检测',
  image_retrieval: '图像检索',
  face_recognition: '人脸识别',
  ocr_recognition: 'OCR 识别',
}

export const THIRD_PARTY_MODEL_TYPES = {
  detection: '目标检测',
  classify: '图片分类',
  // face_detection: '人脸检测',
  // face_recognition: '人脸识别',
  // cityscapes_segment: '通用分割',
  // portrait_segment: '肖像分割',
  // pose_detection: '姿态检测',
  // car_pose_detection: '单目3D检测',
  // keypoints_based_action: '动作识别'
  // monocular_3d_detection: '单目3D检测'
}

export type ModelTypes = typeof MODEL_TYPES
