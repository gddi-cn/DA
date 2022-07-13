import { isEmpty, isNil } from 'lodash'

export const objectToArray = (data:{[key:string]:any}) => {
  const _list:any[] = []
  if (isEmpty(data) || isNil(data)) {
    return _list
  }

  for (const [k, v] of Object.entries(data)) {
    _list.push({
      src: k,
      value: v
    })
  }

  return _list
}
