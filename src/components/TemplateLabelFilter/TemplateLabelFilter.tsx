import React from 'react'
import RemoteSearch from '../RemoteSearch/RemoteSearch'
import { atom, useAtomValue } from 'jotai'
import appAPI from '@src/apis/app'

export interface TemplateLabelFilterProps {
  value?: string
  onChange: (value: string) => void
}

export const templateLabelListAtom = atom(async () => {
  const { success, data } = await appAPI.templateLabelList()
  if (!success || !data) return []

  return data ?? []
})

const TemplateLabelFilter: React.FC<TemplateLabelFilterProps> = (
  {
    value,
    onChange,
  }
) => {
  const templateLabelList = useAtomValue(templateLabelListAtom)
  const getOptions = (name: string):
    Promise<Array<{key: string, value: string, label: string}>> =>
    Promise.resolve(
      templateLabelList
        .filter(x => x && x.includes(name))
        .map(x => ({ key: x, value: x, label: x }))
    )

  return (
    <RemoteSearch
      fetchOptions={getOptions}     
      onChange={(v) => onChange(v?.value)}
      value={value ? { key: value, value, label: value } : undefined}
      allowClear
      showSearch
      placeholder={'全部应用类型'}
      style={{
        width: '100%'
      }}
    />
  )
}

export default TemplateLabelFilter
