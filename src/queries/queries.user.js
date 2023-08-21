export default function UserQuery() {
    const CHECKUSEREXISTENCE = `SELECT username, email FROM users WHERE username = $1 OR email = $2`
    const CHECKEMAIL = `SELECT * FROM users WHERE email = $1`
    const SAVEUSER = `INSERT INTO users (id, username, email, password, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $5)`

    return {
        CHECKUSEREXISTENCE, SAVEUSER, CHECKEMAIL
    }
}