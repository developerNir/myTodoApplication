const express = require('express');
const router = express.Router();

const { loginRequire, isAdmin } = require("../middleware/auth");

const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');
const noteController = require('../controllers/noteController');


router.get('/', (req, res) => {
  res.json({"success": true})
})

// user router--------------------------
router.post('/register', userController.Sining);
router.get('/user-verify/:email/:otp', userController.verifyUser);
router.delete('/user-delete', loginRequire, userController.deleteAccount);



// todo router -----------------------------
router.post('/todo-create', loginRequire, todoController.create);
router.delete('/todo-delete/:id', loginRequire, todoController.deleteTodo);
router.put('/todo-update', loginRequire, todoController.updateTodo);
router.get('/all-todo', loginRequire, todoController.allToDos);

// note Todo route ------------------------------
router.post('/note-create', loginRequire, noteController.createNote);
router.delete('/note-delete/:id', loginRequire, noteController.noteDelete);
router.put('/note-update', loginRequire, noteController.updateNote);
router.get('/note-all/:id', loginRequire, noteController.findAllNotes);

module.exports = router;