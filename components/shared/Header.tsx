import { PortableText } from '@portabletext/react'
import Link from 'next/link'

import { Settings } from '@/lib/sanity.queries'

import Navigation from '../nav/Navigation'

export default function Header({
  title,
  description,
  level,
  menu,
}: {
  title: string
  description?: any[]
  level: 1 | 2
  menu: Settings['menu']
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
            {menu && <Navigation menu={menu} />}
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
          {menu && <Navigation menu={menu} />}
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
