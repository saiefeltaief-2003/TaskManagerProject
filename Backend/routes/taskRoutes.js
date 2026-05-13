const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTasksByUser } = require("../controllers/taskController");

const router = require("express").Router();

router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);
router.get('/user/:user', getTasksByUser);

module.exports = router;