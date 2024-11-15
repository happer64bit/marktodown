"use client"
import { unified } from 'unified'
import toMarkdownAST from 'remark-parse'
import toHtmlAST from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'
import { transformerMetaHighlight } from '@shikijs/transformers'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'

// Initialize a markdown processor pipeline
const markdownProcessor = unified()
    .use(toMarkdownAST)
    .use(remarkGfm)
    .use(toHtmlAST)
    .use(remarkParse)
    .use(rehypeShiki, {
        theme: 'poimandres',
        transformers: [transformerMetaHighlight()],
    })
    .use(rehypeStringify)

export default markdownProcessor;
