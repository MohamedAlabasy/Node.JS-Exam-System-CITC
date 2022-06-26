import { Router } from 'express';
import { getAdmin } from '../../controllers/adminController';
// import { body, check } from 'express-validator';

// import User from '../../models/userSchema';

const admin: Router = Router()

admin.get('', getAdmin)
// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

export default admin;