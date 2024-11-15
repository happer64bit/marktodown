import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { v4 as uuid } from 'uuid'

export const contents = pgTable("contents", {
    id: text("id").$defaultFn(() => uuid()),
    content: varchar("content", {
        length: 2000
    }),
    createdAt: timestamp("createdAt").defaultNow()
})