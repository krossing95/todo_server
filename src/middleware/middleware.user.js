import * as JWT from 'jsonwebtoken'

export default function UserMiddleware() {
    const { verify } = JWT.default
    const verifyToken = (req, res, next) => {
        const header = req.headers['authorization']
        if (typeof header === 'undefined') return res.status(401).json({ message: 'Unauthorized request', code: '401', data: {} })
        const splitHeader = header.split(' ', 2)
        if (splitHeader.length !== 2) return res.status(401).json({ message: 'Unauthorized request', code: '401', data: {} })
        const token = splitHeader[1]
        return verify(token, process.env.TODO_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unauthorized request', code: '401', data: {} })
            next()
            // if (typeof decoded === 'undefined') return res.status(401).json({ message: 'Unauthorized request', code: '401', data: {} })
            // const { id, username, email } = decoded
            // req.user_data = decoded
        })
    }
    return { verifyToken }
}