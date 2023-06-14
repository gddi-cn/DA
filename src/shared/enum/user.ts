export namespace User {
  export namespace Consume {
    export enum Type {
      // 所有类型
      ALL,
      // 计算资源
      CALCULATE,
      // 模型授权
      AUTH,
      // 应用授权
      CHANNEL,
      // 模型训练
      MODEL_TRAIN,
      // 应用设备注册
      ONLINE_DEVICE_RFEGISTER,
      // SDK 设备注册
      OFFLINE_DEVICE_REGISTER,
    }
  }
}
