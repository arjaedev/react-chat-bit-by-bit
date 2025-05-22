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
        const { roomName, description, addedUsers } = req.body;
        console.log(roomName, description, addedUsers);

        const newRoom = new Room({
            roomName,
            description,
            addedUsers
        });

        await newRoom.save();

        const token = jwt.sign(
            { id: newRoom._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log(token);

        res.status(201).json({
            message: 'Room created successfully',
            newRoom,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/room/:id', async (req, res) => {
    try {
        const { roomName, description } = req.body;
        const { id } = req.params;

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { roomName, description },
            { new: true }
        );

        if (!updatedRoom) throw new Error('updatedMessage not found');

        const token = jwt.sign(
            { id: Room._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            updatedRoom,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/room/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        

        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;


