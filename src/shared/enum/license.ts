// 授权类型
export enum LicenseType {
  // SDK 授权
  SDK = 1,
  // SDK DEMO 授权
  DEMO,
  // 完全授权`
  FULL,
  // 应用授权
  APPLICATION,
  // 云端授权
  CLOUD,
}

// 授权状态
export enum LicenseStatus {
  // 审核中
  UNDER_REVIEW = 1,
  // 通过
  PASS,
  // 拒绝
  REJECT,
  // 已失效
  EXPIRE,
}
