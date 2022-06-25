import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config'

import logger from './middleware/logger';

const app = express();
const PORT = 8000;

console.log(process.env) // remove this after you've confirmed it working


// #=======================================================================================#
// #			                          run server                                       #
// #=======================================================================================#
app.listen(PORT || 8000, () => {
    console.log(`App Run at http://localhost:${PORT || 8000}`);
});


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