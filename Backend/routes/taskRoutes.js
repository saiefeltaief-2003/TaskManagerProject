const { createTask, getAllTasks } = require("../controllers/taskController");

const router = require("express").Router();

router.route('/').post(createTask).get(getAllTasks);

module.exports = router;