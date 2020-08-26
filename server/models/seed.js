const Room = require("./Room");

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
