import { Router } from 'express';
import { login, register, getUserData, deleteUser, logout } from '../../controllers/authController';
import { body, check } from 'express-validator';

const auth: Router = Router()

auth.route('')
    .get(checkID(), getUserData)
    .delete(checkID(), deleteUser)

auth.post('/login', checkEmail(), login);
auth.post('/register', checkUserData(), register);
auth.post('/logout', checkID(), logout);

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
        // body('email').isEmail().withMessage('invalid email')
        //     .custom((userEmail) => {
        //         return User.findOne({ email: userEmail })
        //             .then((data) => {
        //                 if (data)
        //                     return Promise.reject('Email already exit')
        //             })
        //     }),

        // check('national_id').custom(tagName => {
        //     return Tag.findOne({ tag: tagName })
        //         .then(tagData => {
        //             if (tagData) {
        //                 return Promise.reject('tag name already exit');
        //             }
        //         });
        // }),

        // check('identifier').custom(tagName => {
        //     return Tag.findOne({ tag: tagName })
        //         .then(tagData => {
        //             if (tagData) {
        //                 return Promise.reject('tag name already exit');
        //             }
        //         });
        // }),
        body('password').isStrongPassword().withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters'),
        body('type').isIn(['admin', 'teacher', 'student']).withMessage('gender must be admin or teacher or student'),
    ]
}

export default auth;