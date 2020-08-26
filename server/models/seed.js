const Room = require("./Room");
const User = require("./User");

Room.create([
    {
        name: "Room 1",
        room_type: "Single",
        rate: 800,
    },
    {
        name: "Room 2",
        room_type: "Single",
        rate: 800,
    },
    {
        name: "Room 3",
        room_type: "Family",
        rate: 1400,
    },
    {
        name: "Room 4",
        room_type: "Family",
        rate: 1400,
    },
    {
        name: "Room 5",
        room_type: "Deluxe",
        rate: 2000,
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
