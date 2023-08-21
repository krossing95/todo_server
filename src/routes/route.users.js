import express from 'express'
import UserController from '../controllers/users/controller.users.js'

const userRoute = express.Router()

const { register, login } = UserController()

userRoute.post('/', register)
userRoute.post('/login', login)

export default userRoute