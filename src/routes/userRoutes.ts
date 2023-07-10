import express from 'express'
import { login, singUp } from '../controllers/user.controller';
import { validate } from '../middleWares/validator.middleWare';
import { userValidation } from '../models/user.model';

const router=express.Router();
    router.route('/')
    .post(validate(userValidation,'post') , singUp)
router.route('/login').post(login
    )

    
export default router;