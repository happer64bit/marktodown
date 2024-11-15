import db from "@/db"
import { contents } from "@/db/schema"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    const data = await db.insert(contents).values({
        content: (await request.json()).content
    }).returning()

    return Response.json({ id: data[0].id })
}