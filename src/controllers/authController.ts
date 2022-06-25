import { Request, Response, NextFunction } from 'express'


// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
export const login = (request: Request, response: Response, next: NextFunction) => {
    response.json({
        status: 1,
        msg: 'login'
    })
}

export const register = (request: Request, response: Response, next: NextFunction) => {
    response.json({
        status: 1,
        msg: 'login'
    })
}

