import { User } from '@src/shared/enum/user'
export const consumeTypeNameMapping: Map<User.Consume.Type, string> =  new Map([
  [User.Consume.Type.ALL, /*       */'所有类型'],
  [User.Consume.Type.CALCULATE, /* */'计算资源'],
  [User.Consume.Type.AUTH, /*      */'授权'],
])
