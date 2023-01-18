declare namespace User {
  interface Menu {
    id: number
    name: string
    parent_id: number
    path: string
  }

  interface ChangePwdForm {
    // 新密码
    np: string
    // 旧密码
    op: string
    // 确定新密码
    cp: string
  }

  interface UpdatePwdData {
    new_password: string
    old_password: string
  }

  interface UpdateData {
    avatar?: string
    email?: string
    nick_name?: string
  }

  interface Role {
    id: number
    menus: Array<Menu>
    name: string
  }

  interface CustomInfo {
    is_customized: boolean
    logo_url: string
    plat_desp: string
    plat_name: string
  }

  interface Quota {
    gup_limited: number
    task_gpu_limited: number
    task_limited: number
  }

  interface Instance {
    avatar: string
    custom_infos: CustomInfo
    email: string
    id: string
    mobile: string
    nick_name: string
    quota: Quota
    roles: Array<Role>
    token: string
    username: string
  }

  // 用户资源用量
  interface Usage {
    // 授权数量限额，值为0时为无限制
    authorization_limited: number
    // 授权用量
    authorization_usage: number
    // 并行 GPU 使用数限制，值为0时为无限制
    gpu_limited: number
    // 存储限额(Byte)，值为0时为无限制
    storage_limited: number
    // 存储用量(Byte)
    storage_usage: number
    // 单任务可使用 GPU 数限制，值为0时为无限制
    task_gpu_limited: number
    // 并行任务数限制，值为0时为无限制
    task_limited: number
    // 训练时长限额(Min), 值为0时为无限制
    train_limited: number
    // 训练时长用量(Min)
    train_usage: number
  }

  namespace Consume {
    interface Instance {
      amount: number
      consume_type: import('@src/shared/enum/user').User.Consume.Type
      created: number
      id: string
      updated: number
    }

    interface ListParams {
      consume_type?: import('@src/shared/enum/user').User.Consume.Type
      page: number
      page_size: number
      sort?: 'asc' | 'desc'
      begin?: number
      end?: number
    }
  }
}
