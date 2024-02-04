import { Param } from '@/hooks/useParams'

import Filter from './Filter'
import Pill from './Pill'
import { FilterGroup, SelectedFilterProps } from './types'

export function FiltersGroupToggle({
  name,
  activeGroup,
  activeFilters,
  onClick,
}: {
  name: string
  activeGroup: string | null
  activeFilters: SelectedFilterProps[]
  onClick: () => void
}) {
  const isActive = activeGroup === name
  const totalActiveOptions = calcActiveOptions(activeFilters, name).values
    .length
  return (
    <Pill
      onClick={onClick}
      label={`Toggle ${name} filters`}
      isActive={isActive}
    >
      {name}
      {totalActiveOptions > 0 && (
        <span className="ml-2 text-sm">({totalActiveOptions})</span>
      )}
    </Pill>
  )
}

export function FiltersGroupOptions({
  group,
  activeFilters,
  updateFilters,
}: {
  group: FilterGroup
  activeFilters: SelectedFilterProps[]
  updateFilters: (params: Param[], shallow: boolean) => void
}) {
  const activeOptions = calcActiveOptions(activeFilters, group.name)

  return (
    <div className="flex gap-x-8 gap-y-4 flex-wrap">
      {group.filters.map((filter) => (
        <Filter
          key={filter.name}
          activeOptions={activeOptions}
          updateFilters={updateFilters}
          filter={filter}
        />
      ))}
    </div>
  )
}

function calcActiveOptions(
  activeFilters: {
    name: string
    values: string[]
  }[],
  group: string,
) {
  return activeFilters.find((filter) => filter.name === group)
}
