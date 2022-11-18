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
