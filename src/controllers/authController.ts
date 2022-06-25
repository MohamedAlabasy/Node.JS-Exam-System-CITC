import { Request, Response, NextFunction } from 'express';

import validateRequest from '../utilities/validateRequest';

// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
export const login = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    response.json({
        status: 1,
        data: 'login'
    })
}
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
export const register = (request: Request, response: Response, next: NextFunction) => {
    response.json({
        status: 1,
        data: 'Register'
    })
}
// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
export const getUserData = (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({
        status: 1,
        data: 'getUserData',
    });
}

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
export const deleteUser = (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({
        status: 1,
        message: 'User deleted successfully',
    });
}

// #=======================================================================================#
// #			                            logout                                         #
// #=======================================================================================#
export const logout = (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({
        status: 1,
        message: 'logout successful',
    })
}