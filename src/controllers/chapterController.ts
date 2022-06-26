import { Request, Response, NextFunction } from 'express';

import validateRequest from '../utilities/validateRequest';
import Chapter from '../models/chapterSchema';

const unreturnedData = "-createdAt -updatedAt -__v";

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
export const createChapter = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    let chapter = new Chapter({
        name: request.body.name,
        course: request.body.course,
    })
    chapter.save()
        .then((data: any) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    name: data.name,
                    course: data.course,
                },
            })
        })
        .catch((error: any) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                       get chapter by ID                                  #
// #=======================================================================================#
export const getChapterByID = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request);
    Chapter.findById(request.body._id).populate({ path: 'course', select: unreturnedData }).select(unreturnedData)
        .then(data => {
            if (data === null) {
                throw new Error(`No Chapter with this _id = ${request.body._id}`)
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
// #			                         get All Course                                    #
// #=======================================================================================#
export const getAllChapters = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Chapter.find({}).populate({ path: 'course', select: unreturnedData }).select(`${unreturnedData}`)
        .then((data) => {
            if (data.length === 0) {
                throw new Error('No chapters to show')
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
export const updateChapter = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Chapter.findById(request.body._id).populate({ path: 'course', select: unreturnedData }).select(`${unreturnedData} -book`)
        .then(chapterData => {
            if (chapterData === null) {
                throw new Error('chapter not found');
            }
            chapterData.name = request.body.name
            chapterData.course = request.body.course
            return chapterData.save()
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
export const deleteChapter = (request: Request, response: Response, next: NextFunction) => {
    validateRequest(request)
    Chapter.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Chapter with this id = ${request.body._id}`)
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