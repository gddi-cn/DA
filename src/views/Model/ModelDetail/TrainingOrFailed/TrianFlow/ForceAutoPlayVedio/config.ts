export interface RawVideoMapTypeItem {
  name:string,
  url:string,
  played:boolean,
  weight:number[]
}

export const RawVideoMap: Array<RawVideoMapTypeItem> = [
  {
    name: '数据准备',
    url: 'https://s3.local.cdn.desauto.net/public/video/8740e037eeba8acf4b009b3e65627c6f.mp4',
    played: false,
    weight: [0, 0.1]
  },
  {
    name: '数据评估',
    url: 'https://s3.local.cdn.desauto.net/public/video/2fc77123ede372d895ef28b3b8aea97f.mp4',
    played: false,
    weight: [0.1, 0.2]
  },
  {
    name: '数据优化',
    url: 'https://s3.local.cdn.desauto.net/public/video/d589c2c5a4c4b0a6071179310d7bab68.mp4',
    played: false,
    weight: [0.2, 0.3]
  },
  {
    name: '模型搜索',
    url: 'https://s3.local.cdn.desauto.net/public/video/4fa6d2a746a3508bc7ffa2a436028b12.mp4',
    played: false,
    weight: [0.3, 0.45]
  },
  {
    name: '模型训练',
    url: 'https://s3.local.cdn.desauto.net/public/video/efd8588863102d84f4b9609206ad93b5.mp4',
    played: false,
    weight: [0.45, 0.80]
  },
  {
    name: '模型调优',
    url: 'https://s3.local.cdn.desauto.net/public/video/64ff0211ca0df421423668a1f1db485f.mp4',
    played: false,
    weight: [0.80, 0.90]
  },
  {
    name: '模型生成',
    url: 'https://s3.local.cdn.desauto.net/public/video/1d38699fbe9e718b964643076aa59a29.mp4',
    played: false,
    weight: [0.90, 1.0]
  },
]

export const flows = RawVideoMap.map((o) => o.name)
