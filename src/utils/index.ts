import dayjs from 'dayjs'

export * from './cusTheme'
export * from './byteToSize'
export * from './getBase64'

export * from './validators'

export * from './webgl'

export const formatUinxTime = (timeStamp: number, formatString = 'YYYY-MM-DD HH:mm'): string => {
  if (typeof timeStamp !== 'number' || !dayjs(timeStamp * 1000).isValid()) return ''

  return dayjs(timeStamp * 1000).format(formatString)
}


