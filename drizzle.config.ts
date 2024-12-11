import type { Config } from 'drizzle-kit'

export default {
    schema: './server/db/schema.ts',
    out: './server/db/migrations',
    driver: 'better-sqlite',
    dbCredentials: {
        url: 'sqlite.db'
    }
} satisfies Config