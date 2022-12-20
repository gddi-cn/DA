// 曼孚工单
declare namespace Order {
  // 详情
  interface Detail {
    // 终止原因
    abortReason: string
    // 创建时间
    created: number
    // 需求描述
    demandDescription: string
    // 需求文档链接
    demandDocUrl: string
    // 预计交付时间
    expectTime: number
    // 完成时间
    finishTime: number,
    // 工单 ID
    id: string
    // 需求名称
    name: string
    // 启动时间
    startTime: number
    // 工单状态
    status: import('@src/shared/enum/order').OrderStatus
    // 数据量
    totalImage:  number
    // 用户名称
    username: string
  }
}