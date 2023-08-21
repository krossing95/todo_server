import { Regex } from "../utils/statics.js"

export default function UserValidations() {
    const { PASSWORD, EMAIL, ALPHANUMERIC } = Regex
    const registerValidation = (data, next) => {
        const { username, email, password } = data
        if (username.length === 0 || email.length === 0 || password.length === 0) return { error: 'All fields are required' }
        if (!username.match(ALPHANUMERIC)) return { error: 'Wrong username format' }
        if (!password.match(PASSWORD)) return { error: 'Password must contain alphanumeric and special chars' }
        if (!email.match(EMAIL)) return { error: 'Incorrect email address' }
        if (username.length < 3) return { error: 'Username must be at least 3 chars' }
        if (password.length < 6) return { error: 'Password must be of at least 6 chars' }
        next()
    }
    const loginValidation = (data, next) => {
        const { email, password } = data
        if (email.length === 0 || password.length === 0) return { error: 'Both fields are required' }
        if (!password.match(PASSWORD)) return { error: 'Password must contain alphanumeric and special chars' }
        if (!email.match(EMAIL)) return { error: 'Incorrect email address' }
        next()
    }
    return {
        registerValidation, loginValidation
    }
}