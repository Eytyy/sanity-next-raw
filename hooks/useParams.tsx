import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useCallback } from 'react'

export type Param = {
  name: string
  value: string | string[] | null
}

export default function useParams(
  fallback: Param[],
): [Param[], (params: Param[], shallow: boolean) => void] {
  const router = useRouter()

  const currentPath = [].concat(router.query?.slug).join('/')
  const hasQuery = Object.keys(router.query).length
  let currentParams: Param[] = fallback

  // if query params present, update the current parameters
  if (hasQuery) {
    currentParams = fallback.map((param) =>
      router.query[param.name]
        ? { ...param, value: router.query[param.name] }
        : param,
    )
  }

  // update the query params on change
  // if shallow is true, the query params will be updated without changing the URL
  // and the new content will be fetched on the client side
  // Otherwise the URL will be updated and the new content will be fetched on the server side
  const setCurrentParams = useCallback(
    (
      params: {
        name: string
        value: string | null
      }[],
      shallow: boolean,
    ) => {
      const urlParams = params
        .filter(
          (p) => p.value !== fallback.find((fb) => fb.name === p.name).value,
        )
        .reduce((r, { name, value }) => {
          r[name] = value?.split(',') // Assign the split value to the property
          return r // Return the modified accumulator
        }, {}) // Initial value for the accumulator

      const qs = queryString.stringify(urlParams, {
        arrayFormat: 'comma',
      })

      if (shallow) {
        router.replace(`${currentPath}${qs ? `?${qs}` : ''}`, undefined, {
          shallow: true,
        })
      } else {
        router.push(`${currentPath}${qs ? `?${qs}` : ''}`, undefined)
      }
    },
    [router, currentPath, fallback],
  )

  return [currentParams, setCurrentParams]
}
