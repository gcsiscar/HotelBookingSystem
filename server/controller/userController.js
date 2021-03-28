// const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Display list of all User.
exports.user_list = async (req, res, next) => {
  try {
    const user_list = await User.find({}).lean();
    return res.status(200).json({
      status: "success",
      message: "Display list of all users",
      data: {
        user_list,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Display detail page for a specific User.
exports.user_detail = async (req, res, nex) => {
  try {
    const user_detail = await User.findById(req.params.id).lean();
    return res.status(200).json({
      status: "success",
      message: "Display detail page for a specific user",
      data: {
        user_detail,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Handle User create on POST.
exports.user_create = async (req, res, next) => {
  try {
    const user_create = await User.create(req.body);
    return res.status(201).json({
      status: "success",
      message: "new user created",
      data: {
        user_create,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Handle User login on POST
exports.user_login = async (req, res, next) => {
  try {
    res.send("N/A");
  } catch (error) {
    next(error);
  }
};

// Handle User delete on POST.
exports.user_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Handle User update on POST.
exports.user_update_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};

// module.exports = {
//   getOne: async (req, res) => {
//     const _id = req.user._id;
//     try {
//       const user = await User.findById(_id)
//         .lean()
//         .select("name email createdAt")
//         .exec();
//       return res.status(200).json(user);
//     } catch (err) {
//       res.status(400).json(err);
//       console.log(err);
//     }
//   },

//   signIn: async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const user = await User.findOne({ email, password }).lean().exec();
//       if (!user) {
//         return res
//           .status(400)
//           .json({ message: "Email & Password does not match" });
//       } else {
//         const token = jwt.sign({ _id: user._id }, "secret");
//         return res.status(200).json({ message: "Log In Successfully", token });
//       }
//     } catch (err) {
//       res.status(400).json(err);
//       console.log(err);
//     }
//   },

//   signUp: async (req, res) => {
//     const { email } = req.body;

//     try {
//       const usedEmail = await User.findOne({ email }).lean().exec();
//       if (!usedEmail) {
//         try {
//           await User.create(req.body);
//           return res.status(201).json({ message: "Register Successfully" });
//         } catch (err) {
//           res.status(400).json(err);
//           console.log(err);
//         }
//       } else {
//         return res.status(400).json({ message: "Email already exists" });
//       }
//     } catch (err) {
//       res.status(400).json(err);
//       console.log(err);
//     }
//   },
// };
