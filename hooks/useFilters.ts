import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'

import type {
  FilterGroup,
  SelectedFilterProps,
} from '@/components/filters/types'
import useParams from '@/hooks/useParams'

type Props = {
  groups: FilterGroup[]
  fetchFilteredContent: (params: FiltersProps) => Promise<any>
}

export type FilterParam = {
  name: string
  value: string
}

type FiltersProps = {
  name: string
  values: string[]
}[]

// Custom hook to manage the state of the filters

// shallow updates:
// - For filter updates
// - The content is fetched from the client side

// Non-shallow updates:
// - For Filter updates when the current page is not 1, pagination updates, and clear filters.
// - Reruns getServersideProps to fetch the content from the server.

export default function useFilters<T>({ groups, fetchFilteredContent }: Props) {
  const [showFilters, setShowFilters] = React.useState(false)

  // Filtered content will hold the data returned from the client side fetch, and will be cleared on a non-shallow updates.
  const [filteredContent, setFilteredContent] = React.useState<T | null>(null)
  const router = useRouter()
  const key = router.asPath.split('?').pop()

  const { mutate: fetch } = useMutation({
    mutationFn: fetchFilteredContent,
    mutationKey: ['filteredBlog', key],
    onSuccess: (data: T) => {
      setFilteredContent(data)
    },
  })

  const [currentParams, setCurrentParams] = useParams([
    { name: 'page', value: null },
    ...groups.map((group) => ({
      name: group.name,
      value: null,
    })),
  ])

  // Update the currentParams with the new values
  const updateParams = React.useCallback(
    (params: FilterParam[], shallow: boolean) => {
      // Update the currentParams with the new values
      const newParams = currentParams.map((filter: FilterParam) => {
        // Find the matching param from the new params
        const matchedParam = params?.find(
          (param: FilterParam) => param.name === filter.name,
        )
        // If there is a match, update the value, otherwise return the current filter
        return matchedParam ? { ...filter, value: matchedParam?.value } : filter
      })
      if (shallow) {
        const filters = newParams
          .filter(
            (param) => !['page', 'sort'].includes(param.name) && param.value,
          )
          .map((param) => ({
            name: param.name,
            values: param?.value.split(','),
          }))
        fetch(filters)
      } else {
        setFilteredContent(null)
      }
      setCurrentParams(newParams, shallow)
    },
    [currentParams, setCurrentParams, fetch],
  )

  // Get the current filters from the currentParams and remove the page and sort params
  const currentFilters = currentParams.filter(
    (param: FilterParam) => !['page', 'sort'].includes(param.name),
  )

  // Convert currentFilters values from string to a list
  const activeFilters: SelectedFilterProps[] = React.useMemo(() => {
    return currentFilters.map((filter: FilterParam) => {
      const currentOptions = filter.value?.split(',') || []
      return {
        name: filter.name,
        values: currentOptions,
      }
    })
  }, [currentFilters])

  const toggleFilters = React.useCallback(
    () => setShowFilters((showFilters) => !showFilters),
    [],
  )

  // Update the page param, and clear the filtered content.
  // This is use as a callback for the pagination component to update the page param
  const updatePageParam = React.useCallback(
    (page: number) => {
      setFilteredContent(null)
      updateParams([{ name: 'page', value: page.toString() }], false)
    },
    [updateParams],
  )

  const clearFilters = React.useCallback(() => {
    const newParams = currentParams.map((param: FilterParam) => {
      setFilteredContent(null)
      return { ...param, value: null }
    })
    setCurrentParams(newParams, false)
    setShowFilters(false)
  }, [currentParams, setCurrentParams])

  return {
    showFilters,
    activeFilters,
    filteredContent,
    updatePageParam,
    clearFilters,
    updateFilters: updateParams,
    toggleFilters,
  }
}
