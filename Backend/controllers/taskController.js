const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

exports.createTask = async (req, res) =>
{
    try
    {
        const { name, description } = req.body;
        const user = req.user.id;
        const newTask = await taskModel.create({
            name: name,
            description: description,
            user: user,
            state: "PENDING"
        });
        await userModel.findOneAndUpdate(
            {_id: user},
            {$push: {tasks: newTask._id}}
        );
        res.status(201).json(
            {
                message: "Task created.",
                data: { newTask },
            }
        );
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "Task creation failed.",
                error: error,
            }
        );
    }
};

exports.getAllTasks = async (req, res) =>
{
    try
    {
        const tasks = await taskModel.find();
        res.status(200).json(
            {
                message: "Fetched all tasks.",
                data:
                {
                    count: tasks.length,
                    tasks
                },
            }
        );
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "Request failed.",
                error: error,
            }
        );
    }
}

exports.getTaskById = async (req, res) =>
{
    try
    {
        const task = await taskModel.findById(req.params.id);
        res.status(200).json(
            {
                message: "Fetched task.",
                data:
                {
                    task
                },
            }
        );
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "Request failed.",
                error: error,
            }
        );
    }
}

exports.updateTask = async (req, res) =>
{
    try
    {
        // const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const task = await taskModel.findById(req.params.id);
        if (task.user != req.user.id)
        {
            res.status(400).json(
                {
                    message: "Task does not belong to current user.",
                    data:
                    {
                        task
                    },
                }
            );
        }
        await taskModel.updateOne(task, req.body, {new: true})
        res.status(200).json(
            {
                message: "Updated task.",
                data:
                {
                    task
                },
            }
        );
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "Request failed.",
                error: error,
            }
        );
    }
}

exports.deleteTask = async (req, res) =>
{
    try
    {
        const taskToDelete = await taskModel.findById(req.params.id);
        if (task.user != req.user.id)
        {
            res.status(400).json(
                {
                    message: "Task does not belong to current user.",
                    data:
                    {
                        task
                    },
                }
            );
        }
        await userModel.findOneAndUpdate(
            {_id: taskToDelete.user},
            {$pull: {tasks: req.params.id}}
        )
        await taskModel.deleteOne(taskToDelete);
        res.status(204).json();
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "Request failed.",
                error: error,
            }
        );
    }
}

exports.getTasksForUser = async (req, res) =>
{
    try
    {
        const tasks = await taskModel.find({user: req.user.id});
        res.status(200).json(
            {
                message: "Fetched all tasks from user.",
                data:
                {
                    count: tasks.length,
                    tasks
                },
            }
        );
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "Request failed.",
                error: error,
            }
        );
    }
}