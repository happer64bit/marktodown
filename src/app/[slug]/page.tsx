import ClientMarkdownRenderBlock from "@/components/ClientMarkdownRenderBlock"
import db from "@/db"
import { ClockIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

async function useMarkdown(id: string) {
    "use server"

    const data = await db.query.contents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id)
    })

    if (data) return data

    notFound()
}

type Params = Promise<{ slug: string }>

export default async function SlugPage({ params }: { params: Params }) {
    const slug = (await params).slug
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { content, createdAt } = await useMarkdown(slug)

    return (
        <div className="bg-neutral-900 w-full h-screen flex justify-center">
            <div className="max-w-4xl max-auto p-6 rounded-lg bg-neutral-800 w-full m-4 shadow-lg">
                <div className="flex items-center justify-end divide-x opacity-70 gap-2">
                    <div className="mr-auto">
                        <Link href="/">Back to Home</Link>
                    </div>
                    <div className="text-sm">
                        <p>id: {slug}</p>
                    </div>
                    <div className="flex items-center text-sm">
                        <ClockIcon size={14}/>
                        <p>{createdAt!.toLocaleString()}</p>
                    </div>
                </div>
                <Suspense fallback={(
                    <p>Loading...</p>
                )}>
                    <ClientMarkdownRenderBlock content={content ?? ""} />
                </Suspense>
            </div>
        </div>
    )
}