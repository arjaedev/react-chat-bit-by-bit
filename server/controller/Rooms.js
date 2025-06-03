const router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 
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

router.post('/room', async (req, res) => {
    try {
        const { roomName, description,} = req.body;
        console.log(roomName, description,);

        const newRoom = new Room({
            roomName,
            description
        });
        

        await newRoom.save();

        res.status(201).json({
            message: 'Room created successfully',
            newRoom
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { roomName, description } = req.body;
        const { id } = req.params;

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { roomName, description },
            { new: true }
        );

        if (!updatedRoom) throw new Error('updatedRoom not found');

        res.status(200).json({
            updatedRoom
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const deleteRoom = await Room.findByIdAndDelete(req.params.id);
        
        if (!deleteRoom) throw new Error('Room not found')

        res.status(200).json({ message: 'Room deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;


