// 数据集下载状态
export enum DatasetDownloadStatus {
  // 未知
  UNKNOWN = 'unknown',
  // 下载中
  DOWNLOADING = 'downloading',
  // 下载失败
  FAILED = 'failed',
  // 下载成功
  SUCCESS = 'success'
}