import { Request, Response, NextFunction } from 'express';

// import validateRequest from '../utilities/validateRequest';
// import Question from '../models/questionSchema';

const unreturnedData = "-createdAt -updatedAt -__v";

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
export const getAdmin = (request: Request, response: Response, next: NextFunction) => {
    response.render('index');
}
