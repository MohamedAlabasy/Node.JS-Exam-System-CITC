import { Router } from 'express'
import { login, register } from '../../controllers/authController';

const auth: Router = Router()

auth.post('/login', login)

auth.post('/register', register)

export default auth;