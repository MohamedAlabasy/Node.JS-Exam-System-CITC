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
    validateRequest(request);
    User.findOne({ email: request.body.email }).select(`+password ${unreturnedData}`)
        .then((data) => {
            if (data === null) {
                throw new Error(`No user with this email = ${request.body.email}`)
            } else {
                let passwordIsValid = bcrypt.compareSync(request.body.password, data.password)
                if (!passwordIsValid) {
                    throw new Error(`invalid password`)
                } else {
                    // to add token to router
                    const accessToken = jwt.sign({ id: data._id, email: data.email, type: data.type }, process.env.ACCESS_TOKEN_SECRET as string, {
                        expiresIn: 86400 //for 24 hour
                    });
                    // add token to db
                    User.findOneAndUpdate({ token: accessToken }).select('+token')
                        .then((_data) => {
                            response.status(200).json({
                                status: 1,
                                token: _data.token,
                                data: {
                                    _id: _data._id,
                                    email: _data.email,
                                    national_id: _data.national_id,
                                    identifier: _data.identifier,
                                    type: _data.type,
                                }
                            });
                        }).catch(error => {
                            next(error);
                        })
                }
            }
        })
        .catch((error) => {
            next(error);
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
    validateRequest(request)
    User.findById(request.body._id).select(unreturnedData)
        .then((data) => {
            if (data === null) {
                throw new Error(`No user with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    data: data,
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
export const deleteUser = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    User.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data === null) {
                throw new Error(`No user with this _id = ${request.body.id}`)
            } else {
                data.deleteUser
                response.status(200).json({
                    status: 1,
                    message: 'User deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}

// #=======================================================================================#
// #			                            logout                                         #
// #=======================================================================================#
export const logout = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    User.findOneAndUpdate({ token: null })
        .then(_ => {
            response.status(200).json({
                status: 1,
                data: 'logout successful',
            })
        }).catch(error => {
            next(error);
        })
}