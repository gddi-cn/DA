declare namespace SortSelector {
  interface Props {
    sort: 'asc' | 'desc'
    sortBy: 'name' | 'registered_time'
    onChange: (sort: 'asc' | 'desc', sortBy: 'name' | 'registered_time') => void
  }
}
