// 曼孚工单状态
export enum OrderStatus {
  COMMIT, // 提交需求
  // 待启动
  NOT_START,
  // 进行中
  IN_PROGRESS,
  // 验收中
  ACCEPTANCE,
  // 反修中
  REWORK,
  // 已完成
  FINISHED,
  // 已终止
  ABROGATION,
}