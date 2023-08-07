import React from 'react'
import {ChipOption} from "@src/shared/types/chip";
import chipAPI from "@src/apis/chip";
import {ApplicationScene} from "@src/shared/enum/application";
import {DatasetScene} from "@src/shared/enum/dataset";
import ChipLabel from "@src/components/ChipSelector/ChipLabel";
import {Select} from "antd";
import {useDebounce} from "use-debounce";

export interface ChipSelectorProps {
  value?: ChipOption
  onChange?: (chip?: ChipOption) => void
}

type GroupedChipList = Array<{
  label: string
  options: Array<ChipOption>
}>

const fetchChipOptions = async (name: string): Promise<GroupedChipList> => {
  try {
    const { success, data } = await chipAPI.chipList({
      application: ApplicationScene.ALL,
      task_type: DatasetScene.Detection,
      name,
    })
    if (!success || !data) return []

    return data.reduce<GroupedChipList>((group, { brand, name, chip_type }) => {
      const value = `${brand},${name},${chip_type}`
      const idx = group.findIndex(x => x.label === brand)
      const option = {
        key: value,
        value,
        label: <ChipLabel chip_type={chip_type} name={name} />,
      }
      if (idx === -1) {
        group.push({
          label: brand,
          options: [ option ]
        })
      } else {
        group[idx].options.push(option)
      }
      return group
    }, [])
  } catch (e) {
    console.error(e)
    return []
  }
}

const ChipSelector: React.FC<ChipSelectorProps> = (
  {
    value,
    onChange,
  }
) => {
  const [name, setName] = React.useState<string>('')
  const [searchName] = useDebounce(name, 300)
  const [options, setOptions] = React.useState<GroupedChipList>([])

  React.useEffect(
    () => {
      fetchChipOptions(searchName).then(setOptions)
    },
    [searchName]
  )

  return (
    <Select
      style={{ width: 200 }}
      placeholder={'芯片型号'}
      showSearch
      onSearch={setName}
      options={options}
      value={value}
      onChange={onChange}
      labelInValue
      allowClear
    />
  )
}

export default ChipSelector
