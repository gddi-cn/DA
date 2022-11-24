import { DatasetDownloadStatus } from '@src/shared/enum/dataset'

export const datasetDownloadStatusNameMapping: Map<DatasetDownloadStatus, string> = new Map([
  [DatasetDownloadStatus.FAILED, /*      */'重新申请'],
  [DatasetDownloadStatus.SUCCESS, /*     */'下载'],
  [DatasetDownloadStatus.UNKNOWN, /*     */'申请下载'],
  [DatasetDownloadStatus.DOWNLOADING, /* */'处理中']
])