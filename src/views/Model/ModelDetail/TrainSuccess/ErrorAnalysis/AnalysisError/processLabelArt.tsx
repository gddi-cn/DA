import { isEmpty, isObject } from 'lodash'

// 先获取最大得cnt作为背景色基准

export const processMatrixData = (data:any) => {
  console.log(data, 32)
  const list:any[] = []
  if (isEmpty(data)) {
    return list
  }

  for (const [k, v] of Object.entries(data)) {
    if (isObject(v)) {
      for (const [sub_k, sub_v] of Object.entries(v)) {
        const { cnt, bbox } = sub_v
        const react_node = (
          <div className='sences_title_label'>
            {cnt}张<p className='yes'>「{k}」</p>被识别为<p className='err'>「{sub_k}」</p>
          </div>
        )
        list.push(
          {
            sign: k,
            value: cnt,
            label: react_node,

            data: { bbox, advice: react_node }
          }
        )
      }
    }
  }

  return list.sort((a: any, b: any) => b.value - a.value)
}
