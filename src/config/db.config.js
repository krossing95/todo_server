import pg from 'pg'
import dotenv from 'dotenv'

export default function DBConnect() {
    dotenv.config()
    const { Pool } = pg
    const pool = new Pool({
        connectionString: process.env.TODO_CONN
    })
    return { pool }
}