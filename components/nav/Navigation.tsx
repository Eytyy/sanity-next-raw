import React from 'react'

import { Settings } from '@/lib/sanity.queries'

import ExternalLink from './ExternalLink'
import InternalLink from './InternalLink'

export default function Navigation({ menu }: { menu: Settings['menu'] }) {
  return (
    <nav className="flex gap-10">
      {menu.map((link) =>
        link._type === 'linkExternal' ? (
          <ExternalLink key={link._key} {...link} />
        ) : (
          <InternalLink key={link._key} {...link} />
        ),
      )}
    </nav>
  )
}
