import express from 'express'
import UserController from '../controllers/users/controller.users.js'

const userRoute = express.Router()

const { register } = UserController()

userRoute.post('/', register)

export default userRoute