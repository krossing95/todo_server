import express from 'express'
import CategoryController from '../controllers/todo/categories/controller.category.js'
import UserMiddleware from '../middleware/middleware.user.js'

const categoryRoute = express.Router()

const { saveCagory } = CategoryController()
const { verifyToken } = UserMiddleware()

categoryRoute.post('/', verifyToken, saveCagory)

export default categoryRoute