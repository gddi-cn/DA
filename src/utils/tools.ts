import {ModuleDefinition} from "gddi-app-builder";

export const formatUnixDate = (time: number): string => Intl.DateTimeFormat(
  'zh-CN',
  {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  .format(new Date(time * 1000))

export const formatUnixTime = (time: number): string => Intl.DateTimeFormat(
  'zh-CN',
  {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour12: false,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
          })
  .format(new Date(time * 1000))

export const downloadBlob = (blob: Blob, fileName: string) => {
  const aElement = document.createElement('a');
  aElement.setAttribute('download', fileName);
  const href = URL.createObjectURL(blob);
  aElement.href = href;
  aElement.setAttribute('target', '_blank');
  aElement.click();
  URL.revokeObjectURL(href);
}

export const formatSize = (value?: number): string => {
  if (!value) return '0 B'

  const uint = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EP']

  let idx = 0

  while (value > 1024 && idx < uint.length - 1) {
    value = ((value / 102.4) | 0) / 10
    idx += 1
  }

  return `${value} ${uint[idx]}`
}

export const iframeDownload = (url: string, delay = 1e3, removeDelay = 3e3) => {
  setTimeout(() => {
    const $iframe = document.createElement('iframe')
    $iframe.style.display = 'none'
    $iframe.src = url
    document.body.appendChild($iframe)
    setTimeout(() => {
      $iframe.remove()
    }, removeDelay)
  }, delay)
}
export const multiDownload = (urls: string[], interval = 1e3) => {
  urls.forEach((url, idx) => {
    iframeDownload(url, idx * interval)
  })
}
export const getVersionFromModuleDefinition = (module?: ModuleDefinition, defaultVersion = 'v3'): string => {
  if (!module) return defaultVersion

  for (const key in module) {
    const m = module[key]
    if (m && m.version) {
      return m.version
    }
  }

  return defaultVersion
}
