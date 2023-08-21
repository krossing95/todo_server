import DBConnect from "../../config/db.config.js"
import RequestBodyChecker from "../../helpers/helpers.request_checker.js"
import UserQuery from "../../queries/queries.user.js"
import UserValidations from "../../validators/validator.users.js"
import { ObjectId } from "bson"
import { hashSync, genSaltSync, compareSync } from "bcrypt"
import * as JWT from 'jsonwebtoken'

export default function UserController() {
    const SALT = genSaltSync(10)
    const { sign } = JWT.default
    const { CHECKUSEREXISTENCE, SAVEUSER, CHECKEMAIL } = UserQuery()
    const { pool } = DBConnect()
    const { registerValidation, loginValidation } = UserValidations()
    const { isTrueBodyStructure } = RequestBodyChecker()
    const register = (req, res) => {
        let { username, email, password } = req.body
        const expected_payload = ['username', 'email', 'password']
        const isTrueBody = isTrueBodyStructure(expected_payload, req.body)
        if (!isTrueBody) return res.status(400).json({ message: 'Bad request', code: '400', data: {} })
        const validate = registerValidation(req.body, async () => {
            try {
                username = username.toLowerCase()
                email = email.trim()
                password = hashSync(password, SALT)
                const checkUserExistence = await pool.query(CHECKUSEREXISTENCE, [username, email])
                if (checkUserExistence.rowCount === 1) return res.status(412).json({ message: 'Username or email address already taken', code: '412', data: {} })
                const id = (new ObjectId()).toString()
                const timestamp = (new Date()).toISOString()
                await pool.query(SAVEUSER, [id, username, email, password, timestamp])
                return res.status(201).json({
                    message: 'User created successfully', code: '201', data: {
                        id, username, email, created_at: timestamp, updated_at: timestamp
                    }
                })
            } catch (error) {
                return res.status(500).json({ message: 'Whoops! Something went wrong', code: '500', data: {} })
            }
        })
        if (validate !== undefined) return res.status(412).json({ message: validate.error, code: '412', data: {} })
    }
    const login = (req, res) => {
        let { email, password } = req.body
        const expected_payload = ['email', 'password']
        const isTrueBody = isTrueBodyStructure(expected_payload, req.body)
        if (!isTrueBody) return res.status(400).json({ message: 'Bad request', code: '400', data: {} })
        const validate = loginValidation(req.body, async () => {
            email = email.trim()
            const checkUser = await pool.query(CHECKEMAIL, [email])
            if (checkUser.rowCount !== 1) return res.status(412).json({ message: 'Incorrect credentials', code: '412', data: {} })
            const userData = checkUser.rows[0]
            const dbPassword = userData.password // hashed
            const isSamePassword = compareSync(password, dbPassword)
            if (!isSamePassword) return res.status(412).json({ message: 'Incorrect credentials', code: '412', data: {} })
            const signInUser = { ...userData, row_id: undefined, password: undefined }
            const token = await sign({ ...signInUser }, process.env.TODO_SECRET, { expiresIn: '2h' })
            if (!token) return res.status(500).json({ message: 'Whoops! Something went wrong', code: '500', data: {} })
            return res.status(200).json({ message: 'Successful login', code: '200', data: { token } })
        })
        if (validate !== undefined) return res.status(412).json({ message: validate.error, code: '412', data: {} })
    }
    return {
        register, login
    }
}