import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import { cn } from '@/lib/utils'

export default function Pagination({
  reachedEnd,
  onClickNav,
}: {
  reachedEnd: boolean
  onClickNav: (page: number) => void
}) {
  const router = useRouter()
  const { page } = router.query
  const currentPage = Number(page) || 1

  const isPrevDisabled = currentPage === 1
  const isNextDisabled = reachedEnd

  const onNext = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClickNav(currentPage + 1)
  }

  const onPrev = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClickNav(currentPage - 1)
  }

  return (
    <div className="sticky bottom-8 mt-8 mb-8  text-6xl font-bold leading-tight tracking-tighter md:text-7xl flex justify-between">
      {!isPrevDisabled ? (
        <Link
          title="Previous page"
          href={`/blog?page=${currentPage - 1}`}
          className="hover:underline"
          onClick={onPrev}
        >
          Prev
        </Link>
      ) : (
        <button
          aria-label="Previous page"
          disabled={isPrevDisabled}
          className={cn('disabled:opacity-50')}
        >
          Prev
        </button>
      )}
      {!isNextDisabled ? (
        <Link
          title="Next page"
          href={`/blog?page=${currentPage + 1}`}
          className="hover:underline"
          onClick={onNext}
        >
          Next
        </Link>
      ) : (
        <button
          aria-label="Next page"
          disabled={isNextDisabled}
          className={cn('disabled:opacity-50')}
        >
          Next
        </button>
      )}
    </div>
  )
}
