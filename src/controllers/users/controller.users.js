import DBConnect from "../../config/db.config.js"
import RequestBodyChecker from "../../helpers/helpers.request_checker.js"
import UserValidations from "../../validators/validator.users.js"

export default function UserController() {
    const { pool } = DBConnect()
    const { registerValidation } = UserValidations()
    const { isTrueBodyStructure } = RequestBodyChecker()
    const register = (req, res) => {
        let { username, email, password } = req.body
        const expected_payload = ['username', 'email', 'password']
        const isTrueBody = isTrueBodyStructure(expected_payload, req.body)
        if (!isTrueBody) return res.status(400).json({ message: 'Bad request', code: '400', data: {} })
        const validate = registerValidation(req.body, async () => {
            try {
                const checkUserExistence = await pool.query()
            } catch (error) {
                return res.status(500).json({ message: 'Whoops! Something went wrong', code: '500', data: {} })
            }
        })
        if (validate !== undefined) return res.status(412).json({ message: validate.error, code: '412', data: {} })
    }
    return {
        register
    }
}