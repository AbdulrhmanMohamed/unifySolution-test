import express from 'express'
import { validate } from '../middleWares/validator.middleWare';
import { todoValidation } from '../models/todo.model';
import { createTodo, deleteTodo, getAllTodos, getTodoInfo, updateTodo } from '../controllers/todo.controller';
import { Authentication } from '../middleWares/authentication.middleWare';


const router=express.Router();
router.route('/').post(validate(todoValidation,'post'),createTodo)
.get(Authentication, getAllTodos)


router.route('/:id')
.get(getTodoInfo)
.put(Authentication, updateTodo)
.delete(Authentication, deleteTodo)


export default router;