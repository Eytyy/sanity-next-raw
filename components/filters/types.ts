export type FilterGroup = {
  name: string
  filters: FilterProps[]
}

export type FilterProps = {
  name: string
  value: string
  title: string
}

export type SelectedFilterProps = {
  name: string
  values: string[]
}
