export default function UserQuery() {
    const CHECKUSEREXISTENCE = `SELECT username, email FROM users WHERE username = $1 OR email = $2`
}