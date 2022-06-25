import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import body_parser from 'body-parser';

import logger from './middleware/logger';

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



// #=======================================================================================#
// #			                        not Found middleware                               #
// #=======================================================================================#
app.use((request: Request, response: Response, next: NextFunction) => {
    response.status(404).send('<h1 style="text-align: center; color:red;">Not Found URL</h1>');
});



// #=======================================================================================#
// #			                      error middleware                                     #
// #=======================================================================================#
app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    response.send(`<h1 style="text-align: center;color:red;">${error.message}</h1>`);
});


export default app;