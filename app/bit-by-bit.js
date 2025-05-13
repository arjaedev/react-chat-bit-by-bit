const router = require('express').Router();
const logError= require('.../service/logError');
const Room = require('../models/room');


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
        const { roomName, roomType } = req.body;
        console.log(roomName, roomType);

        const room = new Room({
            roomName,
            roomType
        });

        await room.save();
        res.status(201).json({
             message: 'Room created successfully',
            data: newRoom
            });
    }
    catch (error) {
        logError(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;