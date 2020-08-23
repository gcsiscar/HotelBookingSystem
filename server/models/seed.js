const Room = require("./Room");
const User = require("./User");

Room.create([
    {
        name: "Room 1",
    },
    {
        name: "Room 2",
    },
    {
        name: "Room 3",
    },
    {
        name: "Room 4",
    },
    {
        name: "Room 5",
    },
]).then((rooms) => console.log(`Created ${rooms.length} rooms`));

User.create([
    {
        name: "User 1",
        email: "user1@gmail.com",
        password: "111111",
    },
    {
        name: "User 2",
        email: "user2@gmail.com",
        password: "111111",
    },
    {
        name: "User 3",
        email: "user3@gmail.com",
        password: "111111",
    },
    {
        name: "User 4",
        email: "user4@gmail.com",
        password: "111111",
    },
    {
        name: "User 5",
        email: "user5@gmail.com",
        password: "111111",
    },
]).then((users) => console.log(`Created ${users.length} users`));
