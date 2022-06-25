import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import body_parser from 'body-parser';
import morgan from 'morgan';

import logger from './middleware/logger';
import routes from './routes/routes';


const app = express();

// #=======================================================================================#
// #			                          run server                                       #
// #=======================================================================================#
app.listen(process.env.PORT || 8000, () => {
    console.log(`App Run at http://${process.env.HOST}:${process.env.PORT || 8888}`);
});

// #=======================================================================================#
// #			                            body_parse                                     #
// #=======================================================================================#
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
// #=======================================================================================#
// #			                            router                                         #
// #=======================================================================================#
app.use('', logger, routes);

// #=======================================================================================#
// #			                        not Found middleware                               #
// #=======================================================================================#
app.use((request: Request, response: Response, next: NextFunction) => {
    response.status(404).json({
        status: 0,
        message: 'Not Found'
    })
});



// #=======================================================================================#
// #			                      error middleware                                     #
// #=======================================================================================#
app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    let status = error.status || 500;
    response.status(status).json({
        status: 0,
        error: error.message + ''
    })
});


export default app;