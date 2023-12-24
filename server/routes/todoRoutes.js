const express = require('express');
const { createTodo, updateTodo, deleteTodo, getTodo } = require('../controller/todoController');
const router = express.Router();
router.post('/create-todo', createTodo);
router.put('/update-todo/:id', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);
router.get('/get-todo', getTodo);
module.exports = router;