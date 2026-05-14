const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    name:
    {
        type: String,
        required: [true, "The name is required."],
        minlength: 3,
        maxlength: 50,
    },
    description:
    {
        type: String,
        required: [true, "The description is required."],
        minlength: 3,
        maxlength: 300,
    },
    user:
    {
        type: Schema.Types.ObjectId,
        required: [true, "A task must belong to a user."],
        ref: "User",
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
});

const Task = model("Task", taskSchema);

module.exports = Task;