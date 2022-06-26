import express from 'express';
import 'dotenv/config'
import body_parser from 'body-parser';
import mongoose from 'mongoose';

import morganMiddleware from './middleware/morganMiddleware';
import headerAccess from './middleware/headerAccess';
import notFoundMiddleware from './middleware/notFoundMiddleware';
import errorMiddleware from './middleware/errorMiddleware';

import routes from './routes/routes';

const app = express();
// #=======================================================================================#
// #			                        connect mongoose                                   #
// #=======================================================================================#
mongoose.connect(process.env.MONGO_DB as string)
    .then((data) => {
        console.log('mongoDB connected on port 27017');
        // run server
        app.listen(process.env.PORT || 8888, () => {
            console.log(`App Run at http://${process.env.HOST}:${process.env.PORT || 8888}`);
        });
    }).catch((error) => {
        console.log('DB not connected: ' + error);
    });
// #=======================================================================================#
// #			                         render template                                   #
// #=======================================================================================#
app.set('view engine', 'ejs');
app.set('views', 'src/views');
// #=======================================================================================#
// #			                            body_parse                                     #
// #=======================================================================================#
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
// #=======================================================================================#
// #			                     add header or use cors                                #
// #=======================================================================================#
app.use(headerAccess);
// #=======================================================================================#
// #			                            router                                         #
// #=======================================================================================#
app.use('', morganMiddleware, routes);
// #=======================================================================================#
// #			                        not Found middleware                               #
// #=======================================================================================#
app.use(notFoundMiddleware);
// #=======================================================================================#
// #			                           middleware                                      #
// #=======================================================================================#
app.use(errorMiddleware);


export default app;