import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  projectId,
} from 'lib/sanity.api'
import { AssetSource, defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { locate } from 'studio/plugins/locate'
import { singletonPlugin } from 'studio/plugins/singelton'

import { schema } from './studio/schemas'
import singletons from './studio/schemas/singletons'
import { structure } from './studio/structure'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema,
  plugins: [
    structureTool({
      structure: structure,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: DRAFT_MODE_ROUTE,
        },
      },
    }),
    media(),
    // Configures the global "new document" button, and document actions, to suit the document singleton
    singletonPlugin({
      types: [...singletons.map((singleton) => singleton.name), 'media.tag'],
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  form: {
    file: {
      assetSources: (previousAssetSources: AssetSource[]) => {
        return previousAssetSources.filter(
          (assetSource) => assetSource !== mediaAssetSource,
        )
      },
    },
    image: {
      assetSources: (previousAssetSources: AssetSource[]) => {
        return previousAssetSources.filter(
          (assetSource) => assetSource === mediaAssetSource,
        )
      },
    },
  },
})
