import { AnimatePresence, motion, Variants } from 'framer-motion'
import type { Artist, Post, PostCategory, Settings } from 'lib/sanity.queries'
import { useRouter } from 'next/router'
import React from 'react'

import Filters from '@/components/filters'
import FiltersControls from '@/components/filters/FiltersControls'
import Pagination from '@/components/Pagination'
import useFilters from '@/hooks/useFilters'
import { getFilteredBlog } from '@/lib/sanity.client'

import HeadLanding from '../shared/HeadLanding'
import PostCard from './PostCard'

export interface BlogPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
  categories: PostCategory[]
  artists: Artist[]
  title?: string
}

const variants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {},
}

export default function BlogPage(props: BlogPageProps) {
  const { title, posts, settings, categories, artists } = props

  const { asPath } = useRouter()

  const filterGroups = React.useMemo(() => {
    const groups = [
      {
        name: 'category',
        filters: categories.map((category) => ({
          name: category.slug,
          value: category.slug,
          title: category.title,
        })),
      },
      {
        name: 'artist',
        filters: artists.map((artist) => ({
          name: artist.slug,
          value: artist.slug,
          title: artist.name,
        })),
      },
    ]
    return groups
  }, [categories, artists])

  const {
    activeFilters,
    showFilters,
    filteredContent,
    clearFilters,
    toggleFilters,
    updateFilters,
    updatePageParam,
  } = useFilters<Post[]>({
    groups: filterGroups,
    fetchFilteredContent: getFilteredBlog,
  })

  // posts come from the server, so we can use them as a fallback and as the initial content
  // filteredContent is the content are fetched from the client side when the filters are updated
  const visibleContent = filteredContent ? filteredContent : posts || []

  return (
    <>
      {/* <HeadLanding settings={settings} title={title} /> */}
      <section>
        <header className="sticky top-8 mb-10 text-6xl font-bold leading-tight tracking-tighter md:text-7xl z-50">
          <div className="flex justify-between flex-wrap">
            <FiltersControls
              activeFilters={activeFilters}
              showFilters={showFilters}
              toggleFilters={toggleFilters}
              clearFilters={clearFilters}
            />
          </div>
          <Filters
            visible={showFilters}
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            updateFilters={updateFilters}
          />
        </header>
        {visibleContent.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={asPath}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-20 lg:gap-x-20">
                  {visibleContent?.map((post) => (
                    <PostCard key={post._id} {...post} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <Pagination
              reachedEnd={visibleContent.length < 6}
              onClickNav={updatePageParam}
            />
          </>
        ) : (
          <p className="text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
            No Stories.
          </p>
        )}
      </section>
    </>
  )
}
