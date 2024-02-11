import { PortableText } from '@portabletext/react'
import Link from 'next/link'

import Navigation from '../Navigation'

export default function Header({
  title,
  description,
  level,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header className="mb-10 mt-16 md:mb-12">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
            {title}
          </h1>
          <div className="flex flex-col items-baseline md:flex-row md:justify-between">
            <h4 className={`mt-4 text-center text-lg md:text-left`}>
              <PortableText value={description} />
            </h4>
            <Navigation />
          </div>
        </header>
      )

    case 2:
      return (
        <header className="mb-10 mt-16 md:mb-12 flex justify-between  items-baseline">
          <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
          <Navigation />
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
