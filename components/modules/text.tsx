import React from 'react'

import styles from '@/components/blog/PostBody.module.css'

import ContentBody from '../shared/ContentBody'
import { TextModuleProps } from './types'

export default function TextModule({ text }: TextModuleProps) {
  return <ContentBody className={styles.portableText} content={text} />
}
