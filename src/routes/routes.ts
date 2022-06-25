import express from 'express';

import auth from './api/auth';

const routes = express.Router()

routes.use('', auth);



export default routes;