import CoverImage from 'components/CoverImage'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

import PostDate from './PostDate'
import { Post } from '@/lib/sanity.queries'

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 10,
  },
}

export default function PostCard({
  title,
  coverImage,
  date,
  excerpt,
  ...post
}: Post) {
  const slug =
    post.variant === 'internal' ? `/blog/${post.slug}` : post.externalUrl
  const internalLink = post.variant === 'internal'

  return (
    <motion.article variants={cardVariants}>
      {coverImage && (
        <div className="mb-5">
          <CoverImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={false}
            linkVariant={post.variant}
            maxWidth={500}
            sizes="(max-width: 768px) 100vw, 33vw"
            format="square"
          />
        </div>
      )}
      <header className="mb-2">
        <div className="text-md">
          <PostDate dateString={date} />
        </div>
        <h3 className="text-3xl leading-tight uppercase font-medium">
          <Link
            href={slug}
            className="hover:underline"
            target={internalLink ? undefined : '_blank'}
            rel={internalLink ? undefined : 'noopener noreferrer'}
          >
            {title}
          </Link>
        </h3>
      </header>
      {excerpt && <p className="mb-4 text-lg leading-snug">{excerpt}</p>}
      {/* {post.variant === 'internal' &&
        post.authors &&
        post.authors.map((author) => (
          <div key={author._id} className="text-xs font-bold">
            {author.name}
          </div>
        ))} */}
    </motion.article>
  )
}
