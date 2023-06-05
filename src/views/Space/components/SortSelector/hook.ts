// name -> 1
// registered_time -> 2
// asc -> 4
// desc -> 8
const options = [
  {
    label: '名称降序',
    value: 9,
  },
  {
    label: '名称升序',
    value: 5,
  },
  {
    label: '注册时间降序',
    value: 10,
  },
  {
    label: '注册时间升序',
    value: 6,
  },
]

export const useSortSelector = (params: SortSelector.Props) => {
  const { sort, sortBy, onChange } = params

  const value = (() => {
    if (sort === 'asc' && sortBy === 'name') {
      return 5
    } else if (sort === 'desc' && sortBy === 'name') {
      return 9
    } else if (sort === 'asc' && sortBy === 'registered_time') {
      return 6
    } else if (sort === 'desc' && sortBy === 'registered_time') {
      return 10
    }
  })();

  const handleChange = (value: number) => {
    if (value === 5) {
      onChange('asc', 'name')
    } else if (value === 9) {
      onChange('desc', 'name')
    } else if (value === 6) {
      onChange('asc', 'registered_time')
    } else if (value === 10) {
      onChange('desc', 'registered_time')
    }
  }

  return {
    options,
    value,
    handleChange,
  }
}
