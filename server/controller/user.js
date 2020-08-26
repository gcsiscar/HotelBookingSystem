const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
    getOne: async (req, res) => {
        const _id = req.user._id;
        try {
            const user = await User.findById(_id)
                .lean()
                .select("name email createdAt")
                .exec();
            return res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },

    signIn: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email, password }).lean().exec();
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Email & Password does not match" });
            } else {
                const token = jwt.sign({ _id: user._id }, "secret");
                return res
                    .status(200)
                    .json({ message: "Log In Successfully", token });
            }
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },

    signUp: async (req, res) => {
        const { email } = req.body;

        try {
            const usedEmail = await User.findOne({ email }).lean().exec();
            if (!usedEmail) {
                try {
                    await User.create(req.body);
                    return res
                        .status(201)
                        .json({ message: "Register Successfully" });
                } catch (err) {
                    res.status(400).json(err);
                    console.log(err);
                }
            } else {
                return res
                    .status(400)
                    .json({ message: "Email already exists" });
            }
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },
};
