"use client"

import markdownProcessor from "@/lib/markdown"
import { useEffect, useState } from "react"

export default function ClientMarkdownRenderBlock({ content } : { content: string }) {
    const [output, setOutput] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function process() {
            setOutput((await markdownProcessor.process(content)).toString())
            setIsLoading(false)
        }

        process()

    }, [content])

    return isLoading ? (
        <p>Parsing Markdown...</p>
    ) : <article className="prose prose-base prose-invert mt-4" dangerouslySetInnerHTML={{ __html: output }}></article>
}