const express = require('express');
const { createTodo, updateTodo, deleteTodo } = require('../controller/todoController');
const router = express.Router();
router.post('/create-todo', createTodo);
router.put('/update-todo', updateTodo);
router.delete('/delete-todo', deleteTodo);
module.exports = router;