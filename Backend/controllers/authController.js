const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "15d"});
}

exports.signUp = async (req, res) =>
{
    try
    {
        const newUser = await userModel.create(
            {
                ...req.body,
                role: req.body.role === "ADMIN" ? "USER" : req.body.role
            }
            
        );
        const token = createToken(newUser.id);
        res.status(201).json(
            {
                message: "User created.",
                data: { newUser },
                token: token
            }
        );
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "User creation failed.",
                error: error,
            }
        );
    }
};

exports.signIn = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        if (!email | !password)
        {
            res.status(400).json(
                {
                    message: "No email or password.",
                    error: error,
                }
            );
        };
        const user = await userModel.findOne({email});
        if (!user)
        {
            res.status(400).json(
                {
                    message: "User with email does not exist.",
                    error: error,
                }
            );
        };
        if (!(await user.comparePassword(password)))
        {
            res.status(400).json(
                {
                    message: "Incorrect password.",
                    error: error,
                }
            );
        }
        const token = createToken(user.id);
        res.status(200).json(
            {
                message: "Logged in.",
                token: token
            }
        );
    }
    catch (error)
    {
        res.status(400).json(
            {
                message: "Log in failed.",
                error: error,
            }
        );
    }
}

exports.getCurrentUser = async (req, res) =>
{
    try
    {
        const user = await userModel.findById(req.user.id);
        res.status(200).json(
            {
                message: "Fetched user.",
                data:
                {
                    user
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