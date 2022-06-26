import { Router } from 'express';
import { createStudentExams, getAllStudentExams, getStudentExamByID, updateStudentExam, deleteStudentExam } from '../../controllers/studentExamController';
import { body, check } from 'express-validator';

import Course from '../../models/courseSchema';
import User from '../../models/chapterSchema';
import checkTokens from '../../utilities/checkTokens';

const studentExam: Router = Router()

studentExam.route('')
    .post(checkQuestionData(), createStudentExams)
    .get(checkTokens, checkID(), getStudentExamByID)
    .patch(checkID(), checkQuestionData(), updateStudentExam)
    .delete(checkTokens, checkID(), deleteStudentExam)

studentExam.get('/all', checkTokens, getAllStudentExams);
// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        body("_id").isInt().withMessage('invalid Student Exam _id')
    ]
}

function checkQuestionData() {
    return [

        body('degree').isInt().withMessage('invalid degree')
            .isLength({ max: 100, min: 0 }).withMessage('degree must between 0 and 100'),

        check('student').custom(studentID => {
            return User.findById(studentID)
                .then(studentData => {
                    if (!studentData) {
                        return Promise.reject('student ID Not Found');
                    }
                });
        }),

        check('course').custom(courseID => {
            return Course.findById(courseID)
                .then(courseData => {
                    if (!courseData) {
                        return Promise.reject('course ID Not Found');
                    }
                });
        }),
    ]
}

export default studentExam;