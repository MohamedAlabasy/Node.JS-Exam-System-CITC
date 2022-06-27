import express from 'express';

import auth from './api/authRouter';
import course from './api/courseRouter';
import chapter from './api/chapterRouter';
import question from './api/questionRouter';
import studentExam from './api/studentExamRouter';


const routes = express.Router()

routes.use('/user', auth);
routes.use('/course', course);
routes.use('/chapter', chapter);
routes.use('/question', question);
routes.use('/exam', studentExam);


export default routes;