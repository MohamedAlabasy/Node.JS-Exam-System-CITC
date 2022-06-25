import { Request, Response, NextFunction } from 'express';

import validateRequest from '../utilities/validateRequest';
import Course from '../models/courseSchema';

const unreturnedData = "-createdAt -updatedAt -__v";

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
export const createCourse = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    let course = new Course({
        name: request.body.name,
        number_characters: request.body.number_characters,
        teacher: request.body.teacher,
    })
    course.save()
        .then((data: any) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    name: data.name,
                    number_characters: data.number_characters,
                    teacher: data.teacher,
                },
            })
        })
        .catch((error: any) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                         get All Course                                    #
// #=======================================================================================#
export const getAllCourse = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Course.find({}).populate({ path: 'teacher', select: unreturnedData }).select(`${unreturnedData}`)
        .then((data) => {
            if (data.length === 0) {
                throw new Error('No Comment to show')
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
export const updateCourse = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Course.findById(request.body._id).populate({ path: 'teacher', select: unreturnedData }).select(`${unreturnedData} -book`)
        .then(courseData => {
            if (courseData === null) {
                throw new Error('Course not found');
            }
            courseData.name = request.body.name
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
export const deleteCourse = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Course.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No course with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'Course deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}