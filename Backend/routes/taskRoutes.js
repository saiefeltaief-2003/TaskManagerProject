const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTasksForUser } = require("../controllers/taskController");
const { authenticateToken } = require("../middlewares/authGuard");

const router = require("express").Router();

router.route('/').post(authenticateToken, createTask).get(getAllTasks);
router.route('/:id').get(getTaskById).patch(authenticateToken, updateTask).delete(authenticateToken, deleteTask);
router.post('/user', authenticateToken, getTasksForUser);

module.exports = router;