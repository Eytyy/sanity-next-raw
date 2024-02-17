import React from 'react'

import Newsletter from './Newsletter'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="py-16 border-t mt-16">
      <Newsletter />
    </footer>
  )
}
