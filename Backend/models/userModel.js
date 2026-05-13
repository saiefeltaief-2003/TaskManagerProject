const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new Schema({
    email:
    {
        type: String,
        required: [true, "The email is required."],
        unique: [true, "The email must be unique."],
        validate: [validator.isEmail, "This email is not valid."],
        lowercase: true,
    },
    name:
    {
        type: String,
        required: [true, "The username is required."],
        minlength: 3,
        maxlength: 50,
    },
    password:
    {
        type: String,
        required: [true, "The password is required."],
        minlength: 6,
    },
    confirmPassword:
    {
        type: String,
        required: [true, "The password confirmation is required."],
        minlength: 6,
        validate: {
            validator: function(cPass) 
            {
                return this.password === cPass;
            },
            message: "The password and the password confirmation do not match."
        }
    },
    role:
    {
        type: String,
        enum: ["ADMIN", "USER"],
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt:
    {
        type: Date,
        default: Date.now()
    },
    tasks:
    [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }],
});

userSchema.pre("save", async function (next)
    {
        if (this.isModified("password"))
        {
            this.password = await bcryptjs.hash(this.password, 12);
            this.confirmPassword = undefined;
        }
        return next;
    }
)

userSchema.methods.comparePassword = async function(inputPassword)
{
    return await bcryptjs.compare(inputPassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;