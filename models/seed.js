const Room = require('./Room');

Room.create([
	{
        name: 'Room 1',
    },
    {
        name: 'Room 2',
    },
    {
        name: 'Room 3',
    },
    {
        name: 'Room 4',
    },
    {
        name: 'Room 5',
    }
]).then(rooms => console.log(`Created ${rooms.length} rooms`));