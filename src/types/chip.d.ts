
declare namespace Chip {
  type Brand = {
    alias: string
    disabled: boolean
    logo: stirng
    logoSlim: string
    name: string
  }

  type Instance = {
    // 应用场景
    application: import('@src/shared/enum/application').ApplicationScene;
    // 芯片品牌
    brand: string;
    // 最大支持 Channel 数
    channel_limited: number;
    // 芯片类型
    chip_type: import('@src/shared/enum/chip').ChipType;
    // 最大支持 FPS
    fps_limited: number;
    // 芯片名称
    name: string;
    // 说明
    summary: string;
    // 芯片说明链接
    url: string;
    // 热门芯片
    is_hot: boolean;
    // 芯片 logo
    logo: string;
    // 过滤后的副本设为 true 以便实现只能高亮选中一个
    _copy?: boolean;
    // 最大分辨率
    resolution_limited: number;
  }
}
