import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import body_parser from 'body-parser';
import morgan from 'morgan';

import logger from './middleware/logger';
import notFound from './middleware/notFound';
import error from './middleware/error';
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
app.use(notFound);
// #=======================================================================================#
// #			                      error middleware                                     #
// #=======================================================================================#
app.use(error);


export default app;