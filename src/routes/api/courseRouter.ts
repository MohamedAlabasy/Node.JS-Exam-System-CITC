import { Router } from 'express';
import { createCourse, getAllCourse, updateCourse, deleteCourse, getCourseByID } from '../../controllers/courseController';
import { body, check } from 'express-validator';

import Course from '../../models/courseSchema';
import User from '../../models/userSchema';
import checkTokens from '../../utilities/checkTokens';

const course: Router = Router()

course.route('')
    .post(checkCourseData(), createCourse)
    .get(checkTokens, checkID(), getCourseByID)
    .patch(checkID(), checkCourseData(), updateCourse)
    .delete(checkTokens, checkID(), deleteCourse)

course.get('/all', checkTokens, getAllCourse);
// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        body("_id").isInt().withMessage('invalid course ID')
    ]
}

function checkCourseData() {
    return [
        check('name')
            .isAlpha().withMessage('invalid name')
            .custom(name => {
                return Course.findOne({ name: name })
                    .then(nameData => {
                        if (nameData) {
                            return Promise.reject('Course name already exit');
                        }
                    });
            }),
        body('number_characters').isInt().withMessage('invalid number_characters'),

        check('teacher').custom(teacherID => {
            return User.findById(teacherID)
                .then(teacherData => {
                    if (!teacherData) {
                        return Promise.reject('teacher ID Not Found');
                    }
                });
        }),
    ]
}

export default course;