const express = require("express");
// const authenticateUser = require("../utils/auth");

const userController = require("../controller/userController");
// const Room = require("../controller/room");
// const Admin = require("../controller/admin");
const router = express.Router();
//user methods
router.get("/user", userController.user_list);
router.get("/user/:id", userController.user_detail);
router.post("/user/login", userController.user_login);
router.post("/user/signup", userController.user_create);

// //Room methods
// router.get("/rooms/booking", authenticateUser, Room.getOne);
// router.post("/rooms/booking", authenticateUser, Room.addBooking);
// router.put("/rooms/booking", authenticateUser, Room.edit);
// router.delete("/rooms/booking", Room.deleteBooking);

// //Admin methods
// router.get("/rooms/admin", Admin.getAllRooms);
// router.get("/user/admin", Admin.getAllUser);
// router.post("/rooms/admin", Admin.addRoom);
// router.delete("/users/admin", Admin.deleteUser);

module.exports = router;
