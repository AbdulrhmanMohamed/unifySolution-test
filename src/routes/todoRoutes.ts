import express from 'express'
import { validate } from '../middleWares/validator.middleWare';
import { todoValidation } from '../models/todo.model';
import { createTodo, deleteTodo, getAllTodos, getTodoInfo, updateTodo } from '../controllers/todo.controller';


const router=express.Router();
router.route('/').post(validate(todoValidation,'post'),createTodo)
.get(getAllTodos)


router.route('/:id').
get(getTodoInfo)
.put(updateTodo)
.delete(deleteTodo)


export default router;