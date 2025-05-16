const router = require('express').Router();
const Room = require('../models/Room');


router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);

    } catch (error) {
        logError(error);
        res.status(500).json({ message: 'server error' });
    }
});

router.post('/rooms', async (req, res) => {
    try {
        const { roomName, description,addedUsers } = req.body;
        console.log(roomName, description, addedUsers);

        const room = new Room({
            roomName,
            description,
            addedUsers
        });

        await room.save();
        res.status(201).json({
             message: 'Room created successfully',
            data: newRoom
            });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;


