import express from 'express';

import auth from './api/studentRouter';

const routes = express.Router()

routes.use('/user', auth);



export default routes;