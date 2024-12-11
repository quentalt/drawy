import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import { join } from 'path'

const runMigrations = async () => {
    const sqlite = new Database('sqlite.db')
    const db = drizzle(sqlite)

    console.log('Running migrations...')

    await migrate(db, {
        migrationsFolder: join(process.cwd(), 'server/db/migrations')
    })

    console.log('Migrations completed!')
    process.exit(0)
}

runMigrations().catch((err) => {
    console.error('Migration failed:', err)
    process.exit(1)
})