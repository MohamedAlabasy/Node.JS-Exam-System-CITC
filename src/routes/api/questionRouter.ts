import { Router } from 'express';
import { createQuestion, getAllQuestion, getQuestionByID, updateQuestion, deleteQuestion } from '../../controllers/questionController';
import { body, check } from 'express-validator';

import Question from '../../models/questionSchema';
import Chapter from '../../models/chapterSchema';
import checkTokens from '../../utilities/checkTokens';

const chapter: Router = Router()

chapter.route('')
    .post(checkQuestionData(), createQuestion)
    .get(checkTokens, checkID(), getQuestionByID)
    .patch(checkID(), checkQuestionData(), updateQuestion)
    .delete(checkTokens, checkID(), deleteQuestion)

chapter.get('/all', checkTokens, getAllQuestion);
// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        body("_id").isInt().withMessage('invalid question _id')
    ]
}

function checkQuestionData() {
    return [
        check('question')
            .isString().withMessage('invalid question')
            .custom((question) => {
                return Question.findOne({ question: question })
                    .then(questionData => {
                        if (questionData && questionData.question != question) {
                            return Promise.reject('question already exit');
                        }
                    });
            }),
        body('choice_1').isString().withMessage('invalid choice_1'),
        body('choice_2').isString().withMessage('invalid choice_2'),
        body('choice_3').isString().withMessage('invalid choice_3'),
        body('correct_answer').isInt().withMessage('invalid correct_answer').isIn([1, 2, 3]).withMessage('correct_answer must be 1 or 2 or 3'),
        body('is_difficult').isBoolean().withMessage('invalid is_difficult must be true or false'),

        check('chapter').custom(chapterID => {
            return Chapter.findById(chapterID)
                .then(chapterData => {
                    if (!chapterData) {
                        return Promise.reject('chapter ID Not Found');
                    }
                });
        }),
    ]
}

export default chapter;