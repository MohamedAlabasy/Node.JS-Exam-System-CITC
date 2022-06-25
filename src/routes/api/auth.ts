import { Router, Request, Response, NextFunction } from 'express'

const auth: Router = Router()

auth.post('/login', (request: Request, response: Response, next: NextFunction) => {

})

auth.post('/register', (request: Request, response: Response, next: NextFunction) => {

})

export default auth;