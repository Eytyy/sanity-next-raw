import React from 'react'

import { FiltersGroupOptions, FiltersGroupToggle } from './FiltersGroup'
import type { FilterGroup, SelectedFilterProps } from './types'

export default function Filters({
  visible,
  activeFilters,
  filterGroups,
  updateFilters,
}: {
  visible: boolean
  activeFilters: SelectedFilterProps[]
  filterGroups: FilterGroup[]
  updateFilters: (params: any, shallow: boolean) => void
}) {
  const [activeGroup, setActiveGroup] = React.useState<string | null>(null)

  if (!visible) return null

  const visibleGroup =
    activeGroup && filterGroups.find((group) => group.name === activeGroup)

  return (
    <div className="space-y-4 py-4">
      <div className="flex gap-10 flex-wrap">
        {filterGroups.map((group) => (
          <FiltersGroupToggle
            key={group.name}
            activeGroup={activeGroup}
            activeFilters={activeFilters}
            onClick={() => setActiveGroup(group.name)}
            {...group}
          />
        ))}
      </div>
      {visibleGroup && (
        <FiltersGroupOptions
          group={visibleGroup}
          activeFilters={activeFilters}
          updateFilters={updateFilters}
        />
      )}
    </div>
  )
}
