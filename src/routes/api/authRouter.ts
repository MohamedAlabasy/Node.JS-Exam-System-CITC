import { Router } from 'express';
import { login, register, getUserData, deleteUser, logout } from '../../controllers/authController';
import { body, check } from 'express-validator';

import User from '../../models/userSchema';
import checkTokens from '../../utilities/checkTokens';

const auth: Router = Router()

auth.route('')
    .get(checkTokens, checkID(), getUserData)
    .delete(checkTokens, checkID(), deleteUser)

auth.post('/login', checkEmail(), login);
auth.post('/register', checkUserData(), register);
auth.post('/logout',checkTokens, checkID(), logout);

// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        body("_id").isInt().withMessage('invalid Comment ID')
    ]
}

function checkEmail() {
    return [
        body('email').isEmail().withMessage('invalid email')
    ]
}

function checkUserData() {
    return [
        body('email').isEmail().withMessage('invalid email')
            .custom((userEmail: String) => {
                return User.findOne({ email: userEmail })
                    .then((data) => {
                        if (data)
                            return Promise.reject('Email already exit')
                    })
            }),

        check('national_id')
            .isInt().withMessage('national_id must be number')
            .isLength({ min: 14, max: 14 }).withMessage('national_id must be 14 number')
            .custom(nationalID => {
                return User.findOne({ national_id: nationalID })
                    .then(nationalIDData => {
                        if (nationalIDData) {
                            return Promise.reject('tag national id already exit');
                        }
                    });
            }),

        check('identifier')
            .isInt().withMessage('identifier must be number')
            .isLength({ min: 10, max: 10 }).withMessage('identifier must be 10 number')
            .custom(identifier => {
                return User.findOne({ identifier: identifier })
                    .then(identifierData => {
                        if (identifierData) {
                            return Promise.reject('tag identifier already exit');
                        }
                    });
            }),

        body('password').isStrongPassword().withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters'),
        body('type').isIn(['admin', 'teacher', 'student']).withMessage('type must be admin or teacher or student'),
    ]
}

export default auth;