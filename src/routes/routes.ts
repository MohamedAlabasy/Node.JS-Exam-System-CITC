import express from 'express';

import auth from './api/authRouter';
import course from './api/courseRouter';

const routes = express.Router()

routes.use('/user', auth);
routes.use('/course', course);



export default routes;