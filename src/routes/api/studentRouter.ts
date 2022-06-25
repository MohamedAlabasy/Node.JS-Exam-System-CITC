// import { Router } from 'express'
import {R} from 'express';
import { login, register, getUserData, deleteUser, logout } from '../../controllers/studentController';

const auth: Router = Router()

auth.route('')
    .get(getUserData)
    .delete(deleteUser)

auth.post('/login', login);
auth.post('/register', register);
auth.post('/logout', logout);

export default auth;