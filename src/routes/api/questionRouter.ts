import { Router } from 'express';
import { createChapter, getAllChapters, getChapterByID, updateChapter, deleteChapter } from '../../controllers/chapterController';
import { body, check } from 'express-validator';

import User from '../../models/userSchema';
import Chapter from '../../models/chapterSchema';
import checkTokens from '../../utilities/checkTokens';

const chapter: Router = Router()

chapter.route('')
    .post(checkCourseData(), createChapter)
    .get(checkTokens, checkID(), getChapterByID)
    .patch(checkID(), checkCourseData(), updateChapter)
    .delete(checkTokens, checkID(), deleteChapter)

chapter.get('/all', checkTokens, getAllChapters);
// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        body("_id").isInt().withMessage('invalid chapter ID')
    ]
}

function checkCourseData() {
    return [
        check('name')
            .isAlpha().withMessage('invalid name')
            .custom(name => {
                return Chapter.findOne({ name: name })
                    .then(nameData => {
                        if (nameData) {
                            return Promise.reject('chapter name already exit');
                        }
                    });
            }),

        check('course').custom(courseID => {
            return User.findById(courseID)
                .then(courseData => {
                    if (!courseData) {
                        return Promise.reject('course ID Not Found');
                    }
                });
        }),
    ]
}

export default chapter;