import AuthorAvatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import { motion } from 'framer-motion'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

import PostDate from './PostDate'

const variant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
}

export default function HeroPost(post: Post) {
  const { title, coverImage, date, excerpt } = post
  const slug =
    post.variant === 'internal' ? `/blog/${post.slug}` : post.externalUrl
  const internalLink = post.variant === 'internal'

  return (
    <motion.section variants={variant}>
      <div className="mb-8 md:mb-16">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority
          linkVariant={post.variant}
          maxWidth={2000}
        />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="text-4xl leading-tight lg:text-6xl">
            <Link href={slug} className="hover:underline">
              {title || 'Untitled'}
            </Link>
          </h3>
          <div className="mb-4 text-md md:mb-0">
            <PostDate dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && <p className="mb-4 text-lg leading-normal">{excerpt}</p>}
          {internalLink &&
            post.authors &&
            post.authors.map((author) => (
              <AuthorAvatar
                key={author.name}
                name={author.name}
                picture={author.picture}
              />
            ))}
        </div>
      </div>
    </motion.section>
  )
}
