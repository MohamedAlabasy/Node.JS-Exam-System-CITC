import { Request, Response, NextFunction } from 'express';

import validateRequest from '../utilities/validateRequest';
import StudentExams from '../models/studentExamSchema';

const unreturnedData = "-createdAt -updatedAt -__v";

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
export const createStudentExams = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    let studentExams = new StudentExams({
        degree: request.body.degree,
        student: request.body.student,
        course: request.body.course,
    })
    studentExams.save()
        .then((data: any) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    degree: data.degree,
                    student: data.student,
                    course: data.course,
                },
            })
        })
        .catch((error: any) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                       get StudentExams by ID                              #
// #=======================================================================================#
export const getStudentExamByID = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    StudentExams.findById(request.body._id).populate({ path: 'course student', select: unreturnedData }).select(unreturnedData)
        .then(data => {
            if (data === null) {
                throw new Error(`No Student Exam with this _id = ${request.body._id}`)
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
// #			                     get All StudentExams                                  #
// #=======================================================================================#
export const getAllStudentExams = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    StudentExams.find({}).populate({ path: 'student course', select: unreturnedData }).select(`${unreturnedData}`)
        .then((data) => {
            if (data.length === 0) {
                throw new Error('No Student Exams to show')
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
export const updateStudentExam = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    StudentExams.findById(request.body._id).populate({ path: 'student course', select: unreturnedData }).select(`${unreturnedData} -book`)
        .then(courseData => {
            if (courseData === null) {
                throw new Error('Student Exam not found');
            }
            courseData.degree = request.body.degree
            courseData.student = request.body.student
            courseData.course = request.body.course
            return courseData.save()
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
export const deleteStudentExam = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    StudentExams.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Student Exam with this _id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'Student Exam deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}