import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import { Param } from '@/hooks/useParams'

import { PillLink } from './Pill'
import { FilterProps, SelectedFilterProps } from './types'

export default function Filter({
  filter,
  activeOptions,
  updateFilters,
}: {
  filter: FilterProps
  activeOptions: SelectedFilterProps
  updateFilters: (params: Param[], shallow: boolean) => void
}) {
  const { value, title } = filter
  const isActive = activeOptions?.values.includes(value)
  const router = useRouter()
  const page = router.query?.page

  // toggle the filter on click
  const toggleFilter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // if the filter is already active, remove it
    const newFilters = activeOptions?.values.includes(value)
      ? activeOptions?.values.filter((v) => v !== value)
      : [...activeOptions?.values, value]
    // update the filters with the new value
    const updated = [
      { name: activeOptions.name, value: newFilters.join(',') || null },
    ]
    updateFilters(
      page ? [...updated, { name: 'page', value: null }] : updated,
      page ? false : true,
    )
  }

  return (
    <PillLink
      href={`/blog${`?${activeOptions.name}=${value}`}`}
      onClick={toggleFilter}
      label={`Toggle ${title} filter`}
      isActive={isActive}
    >
      {title}
    </PillLink>
  )
}
