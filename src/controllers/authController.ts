import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateRequest from '../utilities/validateRequest';
import User from '../models/userSchema';

const unreturnedData = "-createdAt -updatedAt -__v";

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
    validateRequest(request)
    let hash = bcrypt.hashSync(request.body.password, 10);
    let user = new User({
        email: request.body.email,
        national_id: request.body.national_id,
        identifier: request.body.identifier,
        password: hash,
        type: request.body.type,
    })
    user.save()
        .then((data: any) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    email: data.email,
                    national_id: data.national_id,
                    identifier: data.identifier,
                    password: data.password,
                    type: data.type,
                },
            })
        })
        .catch((error: Error) => {
            next(error)
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