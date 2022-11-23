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
