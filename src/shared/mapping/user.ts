import { User } from '@src/shared/enum/user'
export const consumeTypeNameMapping: Map<User.Consume.Type, string> = new Map([
  [User.Consume.Type.ALL, /*                     */'所有类型'],
  [User.Consume.Type.CALCULATE, /*               */'计算资源'],
  [User.Consume.Type.AUTH, /*                    */'模型授权'],
  [User.Consume.Type.CHANNEL, /*                 */'应用授权'],
  [User.Consume.Type.MODEL_TRAIN, /*             */'模型训练'],
  [User.Consume.Type.ONLINE_DEVICE_RFEGISTER, /* */'应用设备注册'],
  [User.Consume.Type.OFFLINE_DEVICE_REGISTER, /* */'SDK 设备注册'],
])
