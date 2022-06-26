import express from 'express';

import auth from './api/authRouter';
import course from './api/courseRouter';
import chapter from './api/chapterRouter';

const routes = express.Router()

routes.use('/user', auth);
routes.use('/course', course);
routes.use('/chapter', chapter);



export default routes;