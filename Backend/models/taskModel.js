const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    name:
    {
        type: String,
        required: [true, "The username is required."],
        minlength: 3,
        maxlength: 50,
    },
    description:
    {
        type: String,
        required: [true, "The username is required."],
        minlength: 3,
        maxlength: 300,
    },
    state:
    {
        type: String,
        enum: ["DONE", "PENDING", "IN PROGRESS", "CANCELED"],
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    },
    startedAt:
    {
        type: Date
    },
    finishedAt:
    {
        type: Date
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A task must belong to a user."],
    },
});

const Task = model("Task", taskSchema);

module.exports = Task;