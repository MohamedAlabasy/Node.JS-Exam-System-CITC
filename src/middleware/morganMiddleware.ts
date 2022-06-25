// import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

// const logger = ((request: Request, response: Response, next: NextFunction) => {
//     console.log(request.method, request.url);
//     next()
// })

const logger = morgan('tiny');

export default logger
