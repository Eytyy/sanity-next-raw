export function BuildBlogQueryFilterString(
  allFilters: {
    name: string
    values: string[]
  }[],
) {
  // build a query string to filter posts by
  const filterString = allFilters
    .map((filter) => {
      const values = filter.values.map((value) => `"${value}"`).join(', ')
      // if the filter is a category, we need to use the count function to check if the post has any of the categories
      // this is because the category field is an array of references
      if (filter.name === 'category') {
        return `(defined(${filter.name}) && count((${filter.name}[]->slug.current)[@in [${values}]]) > 0)`
      }
      // otherwise, we can just check if the post has the value
      return `(defined(${filter.name}) && ${filter.name}->slug.current in [${values}])`
    })
    .join(' && ')
  return filterString
}

export function ParseFiltersValues(filters: Record<string, string>) {
  return Object.entries(filters).map(([name, value]: [string, string]) => ({
    name,
    values: value.split(','),
  }))
}
