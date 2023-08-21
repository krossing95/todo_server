import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import { createServer } from 'http'
import userRoute from './src/routes/route.users.js'
import categoryRoute from './src/routes/route.category.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || process.env.TODO_PORT
app.use(helmet())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['POST', 'GET', 'PATCH', 'DELETE']
}))
app.use(express.json())
app.get('/', (req, res) => {
    return res.send('Welcome to TodoList App')
})
app.use('/api/users', userRoute)
app.use('/api/categories', categoryRoute)
const server = createServer(app)
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))