import { getPlaiceholder } from 'plaiceholder'

import { ImageProps, ModuleProps } from '@/components/modules/types'

import { parseImageProps } from './utils'

async function getLocalBase64(image: ImageProps) {
  try {
    const { src } = parseImageProps({ ...image, maxWidth: 25 })
    const res = await fetch(src)
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.statusText}`)
    }
    const buffer = await res.arrayBuffer()
    const { base64 } = await getPlaiceholder(Buffer.from(buffer), { size: 10 })
    return base64
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.stack)
    }
  }
}

export async function addBlurDataURLToImage(image: ImageProps) {
  return {
    ...image,
    blurDataURL: await getLocalBase64(image),
  }
}

export async function pareseContentImagesBlurDataURL<T>(
  content: (T & { coverImage: ImageProps })[],
): Promise<T[]> {
  return await Promise.all(
    content.map(async (c) => ({
      ...c,
      coverImage: await addBlurDataURLToImage(c.coverImage),
    })),
  )
}

export async function pareseModulesImagesBlurDataURL(
  modules: ModuleProps[],
): Promise<ModuleProps[]> {
  return await Promise.all(
    modules.map(async (module) => {
      switch (module._type) {
        case 'module.body':
          return {
            ...module,
            text: await pareseModulesImagesBlurDataURL(module.text),
          }
        case 'module.artists':
          return {
            ...module,
            content: await pareseContentImagesBlurDataURL(module.content),
          }
        case 'module.artworks':
          return {
            ...module,
            content: await pareseContentImagesBlurDataURL(module.content),
          }
        case 'module.posts':
        case 'module.posts':
          return {
            ...module,
            content: await pareseContentImagesBlurDataURL(module.content),
          }
        case 'module.image': {
          return {
            ...module,
            image: await addBlurDataURLToImage({
              ...module.image,
              alt: module.alt ?? '',
            }),
          }
        }
        case 'module.video':
        case 'module.youtube':
          return {
            ...module,
            video: await addBlurDataURLToImage({ ...module.cover, alt: '' }),
          }
        case 'module.media':
          return {
            ...module,
            items: await Promise.all(
              module.items.map(async (item) => {
                switch (item._type) {
                  case 'module.image':
                    return {
                      ...item,
                      image: await addBlurDataURLToImage({
                        ...item.image,
                        alt: '',
                      }),
                    }
                  case 'module.video':

                  case 'module.youtube':
                    return {
                      ...item,
                      video: await addBlurDataURLToImage({
                        ...item.cover,
                        alt: '',
                      }),
                    }
                  default:
                    return item
                }
              }),
            ),
          }
        default:
          return module
      }
    }),
  )
}
