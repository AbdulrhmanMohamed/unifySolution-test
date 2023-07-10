import express from 'express'
import { validate } from '../middleWares/validator.middleWare';
import { todoValidation } from '../models/todo.model';
import { createTodo, deleteTodo, getAllTodos, getTodoInfo, updateTodo } from '../controllers/todo.controller';
import { Authentication } from '../middleWares/authentication.middleWare';
import { userAccess } from '../middleWares/userAccess';


const router=express.Router();
router.route('/').post(validate(todoValidation,'post'),createTodo)
.get(getAllTodos)


router.route('/:id').
get(getTodoInfo)
.put(Authentication,userAccess, updateTodo)
.delete(Authentication,userAccess, deleteTodo)


export default router;