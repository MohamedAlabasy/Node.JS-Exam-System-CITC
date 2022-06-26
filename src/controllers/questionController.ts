import { Request, Response, NextFunction } from 'express';

import validateRequest from '../utilities/validateRequest';
import Question from '../models/questionSchema';

const unreturnedData = "-createdAt -updatedAt -__v";

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
export const createQuestion = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    let question = new Question({
        question: request.body.question,
        choice_1: request.body.choice_1,
        choice_2: request.body.choice_2,
        choice_3: request.body.choice_3,
        correct_answer: request.body.correct_answer,
        is_difficult: request.body.is_difficult,
        chapter: request.body.chapter,
    })
    question.save()
        .then((data: any) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    question: data.question,
                    choice_1: data.choice_1,
                    choice_2: data.choice_2,
                    choice_3: data.choice_3,
                    correct_answer: data.correct_answer,
                    is_difficult: data.is_difficult,
                    chapter: data.chapter,
                },
            })
        })
        .catch((error: any) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                       get Question by ID                                  #
// #=======================================================================================#
export const getQuestionByID = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    Question.findById(request.body._id).populate({ path: 'chapter', select: unreturnedData }).select(unreturnedData)
        .then(data => {
            if (data === null) {
                throw new Error(`No Question with this _id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    data: data
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                         get All Question                                    #
// #=======================================================================================#
export const getAllQuestion = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Question.find({}).populate({ path: 'chapter', select: unreturnedData }).select(`${unreturnedData}`)
        .then((data) => {
            if (data.length === 0) {
                throw new Error('No Question to show')
            } else {
                response.status(200).json({
                    status: 1,
                    count: data.length,
                    data: data
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                            update                                         #
// #=======================================================================================#
export const updateQuestion = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Question.findById(request.body._id).populate({ path: 'chapter', select: unreturnedData }).select(`${unreturnedData} -book`)
        .then(questionData => {
            if (questionData === null) {
                throw new Error('Question not found');
            }
            questionData.question = request.body.question
            questionData.choice_1 = request.body.choice_1
            questionData.choice_2 = request.body.choice_2
            questionData.choice_3 = request.body.choice_3
            questionData.correct_answer = request.body.correct_answer
            questionData.is_difficult = request.body.is_difficult
            questionData.chapter = request.body.chapter
            return questionData.save()
        }).then(saveData => {
            response.status(200).json({
                status: 1,
                data: saveData,
            })
        })
        .catch(error => {
            next(error)
        })

}
// #=======================================================================================#
// #			                            delete                                         #
// #=======================================================================================#
export const deleteQuestion = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Question.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Question with this _id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'Question deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}