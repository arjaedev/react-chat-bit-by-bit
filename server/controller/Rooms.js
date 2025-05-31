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

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        

        if (!deletedRoom) throw new Error(`Entry deleted`)

        res.status(200).json({ message: 'Room deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;


