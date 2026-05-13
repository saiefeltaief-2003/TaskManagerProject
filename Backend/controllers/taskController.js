const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

exports.createTask = async (req, res) =>
{
    try
    {
        const { name, description, user } = req.body;
        const newTask = await taskModel.create({name, description, user});
        let taskUser = await userModel.findById(user);
        if (!taskUser)
        {
            res.status(400).json(
                {
                    message: "No user with ID found.",
                    error: error,
                }
            );
        };
        taskUser.tasks.push(newTask);
        await userModel.updateOne(taskUser);
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

// // findById finds one user with a given id.
// // req.params is the url params. Look in the routes to see how the id is set up as a path parameter.
// // Conventionally should return a response of status code 200 (OK).
// exports.getUserById = async (req, res) =>
// {
//     try
//     {
//         const user = await userModel.findById(req.params.id);
//         res.status(200).json(
//             {
//                 message: "Fetched user.",
//                 data:
//                 {
//                     user
//                 },
//             }
//         );
//     }
//     catch (error)
//     {
//         res.status(400).json(
//             {
//                 message: "Request failed.",
//                 error: error,
//             }
//         );
//     }
// }

// // findByIdAndUpdate finds a user by id and updates it with the body of the request.
// // The new option lets the response be the user post-update instead of pre-update.
// // The runValidators option allows the field validators to be executed.
// // Conventionally should return a response of status code 200 (OK).
// exports.updateUser = async (req, res) =>
// {
//     try
//     {
//         const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         res.status(200).json(
//             {
//                 message: "Updated user.",
//                 data:
//                 {
//                     user
//                 },
//             }
//         );
//     }
//     catch (error)
//     {
//         res.status(400).json(
//             {
//                 message: "Request failed.",
//                 error: error,
//             }
//         );
//     }
// }

// // findByIdAndDelete finds a user by id and deletes it.
// // Conventionally should return a response of status code 204 (No Content) without a message.
// exports.deleteUser = async (req, res) =>
// {
//     try
//     {
//         await userModel.findByIdAndDelete(req.params.id);
//         res.status(204).json();
//     }
//     catch (error)
//     {
//         res.status(400).json(
//             {
//                 message: "Request failed.",
//                 error: error,
//             }
//         );
//     }
// }