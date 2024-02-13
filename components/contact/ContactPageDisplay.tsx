import type { Settings } from 'lib/sanity.queries'

import Form, { FormFieldProps } from '@/components/form/Form'
import { ModuleProps } from '@/components/modules/types'
import PageHero from '@/components/page/PageHero'
import HeadLanding from '@/components/shared/HeadLanding'

export interface ContactPageProps {
  page: {
    title: string
    slug: string
    hero: { variant: 'default' | 'slider' | 'grid'; content: ModuleProps[] }
    form: { fields: FormFieldProps[] }
  }
  settings: Settings
  preview?: boolean
  loading?: boolean
}

export default function ContactPageDisplay(props: ContactPageProps) {
  const { page, settings } = props
  const { hero, form } = page
  return (
    <>
      <HeadLanding settings={settings} />
      {hero && hero.content?.length > 0 && <PageHero {...hero} />}
      <Form fields={form.fields} />
    </>
  )
}
