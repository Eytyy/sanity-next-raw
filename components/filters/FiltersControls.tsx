import React from 'react'

import { cn } from '@/lib/utils'

import Pill from './Pill'

type Props = {
  showFilters: boolean
  activeFilters: {
    name: string
    values: string[]
  }[]
  clearFilters: () => void
  toggleFilters: () => void
}

export default function FiltersControls({
  showFilters,
  activeFilters,
  toggleFilters,
  clearFilters,
}: Props) {
  // count the total number of active filters
  const filtersTotal = activeFilters.reduce((acc, cur) => {
    return Number(acc + cur.values.length)
  }, 0)

  return (
    <div className="flex gap-4">
      <FiltersToggle showFilters={showFilters} toggleFilters={toggleFilters} />
      {filtersTotal > 0 && (
        <ClearFiltersToggle
          filtersTotal={filtersTotal}
          clearFilters={clearFilters}
        />
      )}
    </div>
  )
}

function FiltersToggle({
  showFilters,
  toggleFilters,
}: Pick<Props, 'showFilters' | 'toggleFilters'>) {
  return (
    <button
      className={cn(
        showFilters
          ? 'bg-black text-white border hover:bg-white hover:border-black  hover:text-black'
          : 'bg-white text-black border hover:border-black ',
        'px-8 py-2 rounded-full transition-colors duration-200 ease-in-out',
      )}
      onClick={toggleFilters}
    >
      Filter
    </button>
  )
}

function ClearFiltersToggle({
  filtersTotal,
  clearFilters,
}: {
  filtersTotal: number
  clearFilters: () => void
}) {
  return (
    <Pill label="Clear all filters" onClick={clearFilters}>
      Clear All
      <span className="ml-2 text-sm">({filtersTotal})</span>
    </Pill>
  )
}
