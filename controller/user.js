const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
    signUp: (req, res, next) => {
        const { name, email, password, password2 } = req.body;

        if (password !== password2)
            return res.status(400).json({ error: "Passwords does not match" });

        User.findOne({ email })
            .then((result) => {
                if (result)
                    return res
                        .status(400)
                        .json({ error: "Email already exists" });

                User.create({
                    name,
                    email,
                    password,
                })
                    .then(() =>
                        res.status(201).json({ msg: "Registered Successfully" })
                    )
                    .catch(next);
            })
            .catch(next);
    },

    getAll: (req, res, next) => {
        User.find()
            .select("name email")
            .then((users) => {
                if (!users) return res.json({ msg: "There are no users yet" });
                return res.status(200).json(users);
            })
            .catch(next);
    },

    signIn: (req, res, next) => {
        const { email, password } = req.body;

        User.findOne({ email, password })
            .then((result) => {
                if (!result)
                    return res
                        .status(400)
                        .json({ error: "Email & Password does not match" });

                const user = {
                    _id: result._id,
                };

                const token = jwt.sign(user, "secret");

                return res
                    .status(200)
                    .json({ msg: "Log In Successfully", token });
            })
            .catch(next);
    },
};
